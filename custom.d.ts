// custom.d.ts
import { NextApiRequest } from 'next';

declare module 'next' {
  export interface NextApiRequest {
    file?: {
      buffer: Buffer;
      originalname: string;
    };
  }
}

import { NextApiRequest } from 'next';
import { File as MulterFile } from 'multer';

declare module 'next' {
  interface NextApiRequest {
    files: MulterFile[]; // Adding files property to handle array of files
  }
}
