// // // import { NextApiRequest, NextApiResponse } from "next";
// // // import formidable, { File, Files } from "formidable";
// // // import fs from "fs";
// // // import { onSubmit, deleteImageFromS3 } from "../../util/AddImgCatS3Util";
// // // export const config = {
// // //   api: {
// // //     bodyParser: false,
// // //   },
// // // };

// // // const handler = async (req: NextApiRequest, res: NextApiResponse) => {
// // //   if (req.method === "POST") {
// // //       const form = formidable({ multiples: false });

// // //     form.parse(req, async (err, fields, files: Files) => {
// // //       if (err) {
// // //         return res.status(500).send("File upload failed.");
// // //       }

// // //       try {
// // //         const file = files.file && !Array.isArray(files.file) ? files.file : files.file?.[0];

// // //         if (!file) {
// // //           return res.status(400).send("No file provided.");
// // //         }
// // //         const fileBuffer = await fs.promises.readFile(file.filepath);
// // //         const oldFileKey = fields.oldFileKey ? fields.oldFileKey.toString() : undefined;
// // //         const uploadResult = await onSubmit(fileBuffer, file.originalFilename || "image.jpg", oldFileKey);
// // //         if (uploadResult && uploadResult.imageUrl && uploadResult.fileKey) {
// // //           res.status(200).json({ imageUrl: uploadResult.imageUrl, fileKey: uploadResult.fileKey });
// // //         } else {
// // //           res.status(500).send("Error uploading new image.");
// // //         }
// // //       } catch (error) {
// // //         console.error("Error during file upload:", error);
// // //         res.status(500).send("Error uploading file to S3.");
// // //       }
// // //     });
// // //   } else if (req.method === "DELETE") {
// // //     const { fileKey } = req.query;

// // //     if (typeof fileKey === "string") {
// // //       try {
// // //         await deleteImageFromS3(fileKey);
// // //         res.status(200).send("Image deleted successfully.");
// // //       } catch (error) {
// // //         console.error("Error deleting image:", error);
// // //         res.status(500).send("Error deleting image.");
// // //       }
// // //     } else {
// // //       res.status(400).send("File key is required.");
// // //     }
// // //   } else {
// // //     res.status(405).send("Method not allowed.");
// // //   }
// // // };

// // // export default handler;

// // // import { NextApiRequest, NextApiResponse } from "next";
// // // import formidable, { File, Files } from "formidable";
// // // import fs from "fs";
// // // import { onSubmit, deleteImageFromS3 } from "../../util/AddImgCatS3Util";

// // // export const config = {
// // //   api: {
// // //     bodyParser: false,
// // //   },
// // // };

// // // const handler = async (req: NextApiRequest, res: NextApiResponse) => {
// // //   if (req.method === "POST") {
// // //     const form = formidable({ multiples: true }); // Allow multiple file uploads

// // //     form.parse(req, async (err, fields, files: Files) => {
// // //       if (err) {
// // //         return res.status(500).send("File upload failed.");
// // //       }

// // //       try {
// // //         const fileArray = files.file && !Array.isArray(files.file) ? [files.file] : files.file;
// // //         if (!fileArray || !fileArray.length) {
// // //           return res.status(400).send("No files provided.");
// // //         }

// // //         const uploadedFiles = [];
// // //         for (const file of fileArray) {
// // //           const fileBuffer = await fs.promises.readFile(file.filepath);
// // //           const oldFileKey = fields.oldFileKey ? fields.oldFileKey.toString() : undefined;
// // //           const uploadResult = await onSubmit(fileBuffer, file.originalFilename || "image.jpg", oldFileKey);
// // //           if (uploadResult && uploadResult.imageUrl && uploadResult.fileKey) {
// // //             uploadedFiles.push({ imageUrl: uploadResult.imageUrl, fileKey: uploadResult.fileKey });
// // //           }
// // //         }

// // //         if (uploadedFiles.length > 0) {
// // //           res.status(200).json({ uploadedFiles });
// // //         } else {
// // //           res.status(500).send("Error uploading new images.");
// // //         }
// // //       } catch (error) {
// // //         console.error("Error during file upload:", error);
// // //         res.status(500).send("Error uploading files to S3.");
// // //       }
// // //     });
// // //   } else if (req.method === "DELETE") {
// // //     const { fileKey } = req.query;
// // //     if (typeof fileKey === "string") {
// // //       try {
// // //         await deleteImageFromS3(fileKey);
// // //         res.status(200).send("Image deleted successfully.");
// // //       } catch (error) {
// // //         console.error("Error deleting image:", error);
// // //         res.status(500).send("Error deleting image.");
// // //       }
// // //     } else {
// // //       res.status(400).send("File key is required.");
// // //     }
// // //   } else {
// // //     res.status(405).send("Method not allowed.");
// // //   }
// // // };

// // // export default handler;

// // import { NextApiRequest, NextApiResponse } from "next";
// // import formidable, { File, Files } from "formidable";
// // import fs from "fs";
// // import { onSubmit, deleteImageFromS3 } from "../../util/AddImgCatS3Util";

// // export const config = {
// //   api: {
// //     bodyParser: false,
// //   },
// // };

// // const handler = async (req: NextApiRequest, res: NextApiResponse) => {
// //   if (req.method === "POST") {
// //     const form = formidable({ multiples: true });

// //     form.parse(req, async (err, fields, files: Files) => {
// //       if (err) {
// //         return res.status(500).send("File upload failed.");
// //       }

// //       try {
// //         const fileList = Array.isArray(files.file) ? files.file : [files.file];
// //         const imageUrls: string[] = [];
// //         const fileKeys: string[] = [];

// //         for (const file of fileList) {
// //           if (file) {
// //             const fileBuffer = await fs.promises.readFile(file.filepath);
// //             const uploadResult = await onSubmit(fileBuffer, file.originalFilename || "image.jpg");
// //             if (uploadResult && uploadResult.imageUrl && uploadResult.fileKey) {
// //               imageUrls.push(uploadResult.imageUrl);
// //               fileKeys.push(uploadResult.fileKey);
// //             }
// //           }
// //         }

// //         if (imageUrls.length) {
// //           res.status(200).json({ imageUrls, fileKeys });
// //         } else {
// //           res.status(500).send("Error uploading images.");
// //         }
// //       } catch (error) {
// //         console.error("Error during file upload:", error);
// //         res.status(500).send("Error uploading files to S3.");
// //       }
// //     });
// //   } else if (req.method === "DELETE") {
// //     const { fileKey } = req.query;

// //     if (typeof fileKey === "string") {
// //       try {
// //         await deleteImageFromS3(fileKey);
// //         res.status(200).send("Image deleted successfully.");
// //       } catch (error) {
// //         console.error("Error deleting image:", error);
// //         res.status(500).send("Error deleting image.");
// //       }
// //     } else {
// //       res.status(400).send("File key is required.");
// //     }
// //   } else {
// //     res.status(405).send("Method not allowed.");
// //   }
// // };

// // export default handler;

// import { NextApiRequest, NextApiResponse } from "next";
// import formidable, { File, Files } from "formidable";
// import fs from "fs";
// import { onSubmit, deleteImageFromS3 } from "../../util/AddImgCatS3Util";
// export const config = {
//   api: {
//     bodyParser: false,
//   },
// };

// const handler = async (req: NextApiRequest, res: NextApiResponse) => {
//   if (req.method === "POST") {
//       const form = formidable({ multiples: false });

//     form.parse(req, async (err, fields, files: Files) => {
//       if (err) {
//         return res.status(500).send("File upload failed.");
//       }

//       try {
//         const file = files.file && !Array.isArray(files.file) ? files.file : files.file?.[0];

//         if (!file) {
//           return res.status(400).send("No file provided.");
//         }
//         const fileBuffer = await fs.promises.readFile(file.filepath);
//         const oldFileKey = fields.oldFileKey ? fields.oldFileKey.toString() : undefined;
//         const uploadResult = await onSubmit(fileBuffer, file.originalFilename || "image.jpg", oldFileKey);
//         if (uploadResult && uploadResult.imageUrl && uploadResult.fileKey) {
//           res.status(200).json({ imageUrl: uploadResult.imageUrl, fileKey: uploadResult.fileKey });
//         } else {
//           res.status(500).send("Error uploading new image.");
//         }
//       } catch (error) {
//         console.error("Error during file upload:", error);
//         res.status(500).send("Error uploading file to S3.");
//       }
//     });
//   } else if (req.method === "DELETE") {
//     const { fileKey } = req.query;

//     if (typeof fileKey === "string") {
//       try {
//         await deleteImageFromS3(fileKey);
//         res.status(200).send("Image deleted successfully.");
//       } catch (error) {
//         console.error("Error deleting image:", error);
//         res.status(500).send("Error deleting image.");
//       }
//     } else {
//       res.status(400).send("File key is required.");
//     }
//   } else {
//     res.status(405).send("Method not allowed.");
//   }
// };

// export default handler;
 
// app/api/AddImgPut.ts
// app/api/AddImgPut.ts
/*
import type { NextApiRequest, NextApiResponse } from 'next';
import AWS from 'aws-sdk';
import multer from 'multer';
import { promisify } from 'util';
import { IncomingMessage, ServerResponse } from 'http';

// AWS S3 configuration
const s3 = new AWS.S3({
  accessKeyId: process.env.S3_AWS_ACCESS_KEY_ID,
  secretAccessKey: process.env.S3_AWS_SECRET_ACCESS_KEY,
  region: process.env.S3_AWS_REGION,
});

// Configure multer for file uploads
const upload = multer({
  storage: multer.memoryStorage(), // Store files in memory
  limits: { fileSize: 10 * 1024 * 1024 }, // 10 MB file size limit
});

// Promisify the multer middleware
const uploadMiddleware = upload.array('files'); // Expecting multiple files with field name 'files'
const uploadFiles = promisify(uploadMiddleware);

// Helper function to upload a file to S3
async function uploadToS3(file: Express.Multer.File) {
  const params = {
    Bucket: process.env.S3_AWS_BUCKET_NAME as string,
    Key: `${Date.now()}_${file.originalname}`, // Unique filename
    Body: file.buffer,
    ContentType: file.mimetype,
    ACL: 'public-read', // Make the file publicly readable
  };

  return s3.upload(params).promise(); // Upload the file to S3
}

// Function to convert Next.js request/response to Express-compatible types
function runMiddleware(req: NextApiRequest, res: NextApiResponse, fn: Function) {
  return new Promise((resolve, reject) => {
    fn(req as unknown as IncomingMessage, res as unknown as ServerResponse, (result: any) => {
      if (result instanceof Error) {
        return reject(result);
      }
      return resolve(result);
    });
  });
}

// Next.js API handler
export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  if (req.method === 'POST') {
    try {
      // Run multer middleware with type conversion
      await runMiddleware(req, res, uploadFiles);

      const files = req.files as Express.Multer.File[];

      // Upload all files to S3 and collect the results
      const uploadPromises = files.map(file => uploadToS3(file));
      const results = await Promise.all(uploadPromises);

      // Collect the URLs of the uploaded files
      const urls = results.map(result => result.Location);

      // Return the URLs in the response
      res.status(200).json({ urls });
      console.log("Urls" + urls);
    } catch (error) {
      console.error('Upload error:', error);
      res.status(500).json({ error: 'Error uploading files' });
    }
  } else if (req.method === 'DELETE') {
    const { key } = req.query; // Pass the S3 key (filename) to delete the image
    console.log('Attempting to delete:', key); // Log the key being used
    const params = {
      Bucket: process.env.S3_AWS_BUCKET_NAME as string,
      Key: key as string,
    };

    try {
      // Delete the object from S3
      await s3.deleteObject(params).promise();
      res.status(200).json({ message: 'Image deleted successfully' });
    } catch (error) {
      console.error('Delete error:', error); // Log the error
      res.status(500).json({ error: 'Error deleting image' });
    }
  } else {
    // Handle any other HTTP method
    res.setHeader('Allow', ['POST', 'DELETE']);
    res.status(405).end(`Method ${req.method} Not Allowed`);
  }
}

// Disable Next.js built-in body parser to handle file uploads
export const config = {
  api: {
    bodyParser: false, // Multer will handle the file uploads
  },
};
*/

import type { NextApiRequest, NextApiResponse } from 'next';
import AWS from 'aws-sdk';
import multer from 'multer';
import { promisify } from 'util';
import { IncomingMessage, ServerResponse } from 'http';
import { ddbDocClient } from "@/utils/dbconfig"; // Adjust the path as necessary
import { PutCommand } from "@aws-sdk/lib-dynamodb";

const s3 = new AWS.S3({
  accessKeyId: process.env.S3_AWS_ACCESS_KEY_ID,
  secretAccessKey: process.env.S3_AWS_SECRET_ACCESS_KEY,
  region: process.env.S3_AWS_REGION,
});

const upload = multer({
  storage: multer.memoryStorage(),
  limits: { fileSize: 10 * 1024 * 1024 },
});

const uploadMiddleware = upload.array('files');
const uploadFiles = promisify(uploadMiddleware);

async function uploadToS3(file: Express.Multer.File) {
  const params = {
    Bucket: process.env.S3_AWS_BUCKET_NAME as string,
    Key: `${Date.now()}_${file.originalname}`,
    Body: file.buffer,
    ContentType: file.mimetype,
    ACL: 'public-read',
  };
  return s3.upload(params).promise();
}

function runMiddleware(req: NextApiRequest, res: NextApiResponse, fn: Function) {
  return new Promise((resolve, reject) => {
    fn(req as unknown as IncomingMessage, res as unknown as ServerResponse, (result: any) => {
      if (result instanceof Error) {
        return reject(result);
      }
      return resolve(result);
    });
  });
}

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  if (req.method === 'POST') {
    try {
      await runMiddleware(req, res, uploadFiles);
      const files = req.files as Express.Multer.File[];
      const uploadPromises = files.map(file => uploadToS3(file));
      const results = await Promise.all(uploadPromises);
      const urls = results.map(result => result.Location);
      const productDetails = {
        ProductName: req.body.ProductName,
        ProductDescription: req.body.ProductDescription,
        Category: req.body.Category,
        Brand: req.body.Brand,
        Dimensions: req.body.Dimensions,
        Colors: req.body.Colors,
        Warranty: req.body.Warranty,
        ModuleNumber: req.body.ModuleNumber,
        photoUrls: urls, // Save the URLs as an array
      };
      res.status(200).json({ urls });
    } catch (error) {
      console.error('Upload error:', error);
      res.status(500).json({ error: 'Error uploading files' });
    }
  } else if (req.method === 'DELETE') {
    const { key } = req.query;
    const params = {
      Bucket: process.env.S3_AWS_BUCKET_NAME as string,
      Key: key as string,
    };
    try {
      await s3.deleteObject(params).promise();
      res.status(200).json({ message: 'Image deleted successfully' });
    } catch (error) {
      console.error('Delete error:', error);
      res.status(500).json({ error: 'Error deleting image' });
    }
  } else {
    res.setHeader('Allow', ['POST', 'DELETE']);
    res.status(405).end(`Method ${req.method} Not Allowed`);
  }
}
export const config = {
  api: {
    bodyParser: false,
  },
};
