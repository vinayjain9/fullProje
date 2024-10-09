
import { S3Client, PutObjectAclCommand, DeleteObjectCommand } from '@aws-sdk/client-s3';
import { createPresignedPost } from '@aws-sdk/s3-presigned-post';
import { nanoid } from 'nanoid';
import mime from 'mime-types';
export async function deleteImageFromS3(fileKey: string) {
  const client = new S3Client({
    region: process.env.S3_AWS_REGION,
    credentials: {
      accessKeyId: process.env.S3_AWS_ACCESS_KEY_ID!,
      secretAccessKey: process.env.S3_AWS_SECRET_ACCESS_KEY!,
    },
  });

  try {
    await client.send(new DeleteObjectCommand({
      Bucket: process.env.S3_AWS_BUCKET_NAME,
      Key: fileKey,
    }));
    console.log(`Deleted old image with key: ${fileKey}`);
  } catch (error) {
    console.error(`Error deleting image: ${error}`);
    throw error;
  }
}

export async function onSubmit(fileBuffer: Buffer, originalFilename: string, oldFileKey?: string) {
  try {
    const client = new S3Client({
      region: process.env.S3_AWS_REGION,
      credentials: {
        accessKeyId: process.env.S3_AWS_ACCESS_KEY_ID!,
        secretAccessKey: process.env.S3_AWS_SECRET_ACCESS_KEY!,
      },
    });

    // If there's an old image key, delete the old image
    if (oldFileKey) {
      await deleteImageFromS3(oldFileKey);
    }

    const fileKey = `${nanoid()}.${originalFilename.split('.').pop()}`;
    const contentType = mime.lookup(originalFilename) || 'application/octet-stream';

    const { url, fields } = await createPresignedPost(client, {
      Bucket: process.env.S3_AWS_BUCKET_NAME || '',
      Key: fileKey,
      Conditions: [
        ['content-length-range', 0, 10485760], // File size limit of 10MB
        ['eq', '$Content-Type', contentType],
      ],
      Fields: {
        'Content-Type': contentType,
      },
      Expires: 60, // URL expiry time in seconds
    });

    const formDataS3 = new FormData();
    Object.entries(fields).forEach(([key, value]) => {
      formDataS3.append(key, value);
    });

    formDataS3.append('file', new Blob([fileBuffer], { type: contentType }), originalFilename);

    const uploadResponse = await fetch(url, {
      method: 'POST',
      body: formDataS3,
    });

    if (uploadResponse.ok) {
      const imageUrl = `https://${process.env.S3_AWS_BUCKET_NAME}.s3.amazonaws.com/${fileKey}`;

      // Set ACL to public-read
      await client.send(new PutObjectAclCommand({
        Bucket: process.env.S3_AWS_BUCKET_NAME,
        Key: fileKey,
        ACL: 'public-read',
      }));

      console.log('File uploaded and ACL set successfully:', imageUrl);
      return { imageUrl, fileKey };
    } else {
      const errorMessage = await uploadResponse.text();
      console.error('Failed to upload file:', errorMessage);
      return null;
    }
  } catch (err) {
    console.error('Error:', err);
    return null;
  }
}
