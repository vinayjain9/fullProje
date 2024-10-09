// import { NextApiRequest, NextApiResponse } from 'next';
// import formidable, { IncomingForm } from 'formidable';
// import fs from 'fs';
// import { onSubmit ,deleteImageFromS3} from '../../util/AddImgS3';
// export const config = {
//   api: {
//     bodyParser: false,
//   },
// };

// export default async function handler(req: NextApiRequest, res: NextApiResponse) {
//   if (req.method === 'POST') {
//     // const form = new IncomingForm();

//     const form = new formidable.IncomingForm();
//     form.parse(req, async (err, fields, files) => {
//       if (err) {
//         console.error('Error parsing form:', err);
//         res.status(500).send('Error parsing the form');
//         return;
//       }

//       const fileArray = files.file;

//       if (!fileArray) {
//         res.status(400).send('No file uploaded');
//         return;
//       }

//       let file: formidable.File;

//       if (Array.isArray(fileArray)) {
//           file = fileArray[0];
//       } else {
//           file = fileArray as formidable.File;
//       }

//       if (!file) {
//         res.status(400).send('No valid file uploaded');
//         return;
//       }

//         const fileData = fs.readFileSync(file.filepath);

//       try {
//         const imageUrl = await onSubmit(fileData, file.originalFilename!);
//         if (imageUrl) {
//           res.status(200).send(imageUrl); // Return the image URL if successful
//         } else {
//           res.status(500).send('Failed to upload image to S3');
//         }
//       } catch (error) {
//         console.error('Error uploading to S3:', error);
//         res.status(500).send('Server error');
//       }
//     });
//   } else {
//     res.setHeader('Allow', ['POST']);
//     res.status(405).end(`Method ${req.method} Not Allowed`);
//   }
// }

// import { NextApiRequest, NextApiResponse } from "next";
// import formidable from "formidable";
// import fs from "fs";
// import { onSubmit, deleteImageFromS3 } from "../../util/AddImgCatS3Util"; // Import deleteImageFromS3 utility

// export const config = {
//   api: {
//     bodyParser: false, // Disable body parsing to handle file upload manually
//   },
// };

// const handler = async (req: NextApiRequest, res: NextApiResponse) => {
//   if (req.method === "POST") {
//     // Image Upload/Update Route
//     const form = new formidable.IncomingForm();
//     form.parse(req, async (err, fields, files) => {
//       if (err) {
//         return res.status(500).send("File upload failed.");
//       }

//       try {
//         const file = files.file as formidable.File;
//         const fileStream = fs.createReadStream(file.filepath);

//         // Get the old image key (if provided)
//         const oldFileKey = fields.oldFileKey ? fields.oldFileKey.toString() : undefined;

//         const { imageUrl, fileKey } = await onSubmit(fileStream, file.originalFilename || "image.jpg", oldFileKey);

//         if (imageUrl && fileKey) {
//           res.status(200).send({ imageUrl, fileKey }); // Return image URL and fileKey to frontend
//         } else {
//           res.status(500).send("Error uploading new image.");
//         }
//       } catch (error) {
//         res.status(500).send("Error uploading file to S3.");
//       }
//     });
//   } else if (req.method === "DELETE") {
//     // Handle Delete Image
//     const { fileKey } = req.query;

//     if (typeof fileKey === "string") {
//       try {
//         await deleteImageFromS3(fileKey);
//         res.status(200).send("Image deleted successfully.");
//       } catch (error) {
//         res.status(500).send("Error deleting image.");
//       }
//     } else {
//       res.status(400).send("File key is required.");
//     }
//   } else {
//     res.status(405).send("Method not allowed.");
//   }
// };

// export default handler;import

import { NextApiRequest, NextApiResponse } from "next";
import formidable, { File, Files } from "formidable";
import fs from "fs";
import { onSubmit, deleteImageFromS3 } from "../../util/AddImgCatS3Util"; // Import deleteImageFromS3 utility

export const config = {
  api: {
    bodyParser: false, // Disable body parsing to handle file upload manually
  },
};

const handler = async (req: NextApiRequest, res: NextApiResponse) => {
  if (req.method === "POST") {
    // Image Upload/Update Route
    const form = formidable({ multiples: false }); // Handle a single file

    form.parse(req, async (err, fields, files: Files) => {
      if (err) {
        return res.status(500).send("File upload failed.");
      }

      try {
        // Check if files.file exists and is not undefined
        const file = files.file && !Array.isArray(files.file) ? files.file : files.file?.[0];

        if (!file) {
          return res.status(400).send("No file provided.");
        }

        // Read the file into a buffer instead of using a stream
        const fileBuffer = await fs.promises.readFile(file.filepath);

        // Get the old image key (if provided)
        const oldFileKey = fields.oldFileKey ? fields.oldFileKey.toString() : undefined;

        // Upload the new image and delete the old one if oldFileKey is provided
        const uploadResult = await onSubmit(fileBuffer, file.originalFilename || "image.jpg", oldFileKey);

        // Ensure the result from onSubmit isn't null
        if (uploadResult && uploadResult.imageUrl && uploadResult.fileKey) {
          // Respond with a JSON object instead of a string
          res.status(200).json({ imageUrl: uploadResult.imageUrl, fileKey: uploadResult.fileKey });
        } else {
          res.status(500).send("Error uploading new image.");
        }
      } catch (error) {
        console.error("Error during file upload:", error);
        res.status(500).send("Error uploading file to S3.");
      }
    });
  } else if (req.method === "DELETE") {
    // Handle Delete Image
    const { fileKey } = req.query;

    if (typeof fileKey === "string") {
      try {
        await deleteImageFromS3(fileKey);
        res.status(200).send("Image deleted successfully.");
      } catch (error) {
        console.error("Error deleting image:", error);
        res.status(500).send("Error deleting image.");
      }
    } else {
      res.status(400).send("File key is required.");
    }
  } else {
    res.status(405).send("Method not allowed.");
  }
};

export default handler;

