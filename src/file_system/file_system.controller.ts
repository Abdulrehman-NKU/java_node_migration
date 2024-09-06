import {
  Controller,
  Post,
  UseInterceptors,
  UploadedFile,
  UploadedFiles,
} from '@nestjs/common';
import { FileInterceptor, AnyFilesInterceptor } from '@nestjs/platform-express';
import { diskStorage, Multer } from 'multer';
import { existsSync, mkdirSync } from 'node:fs';

@Controller('file')
export class FileSystemController {
  @Post('upload')
  @UseInterceptors(
    AnyFilesInterceptor({
      storage: diskStorage({
        destination: (req, file, cb) => {
          console.log({ file });
          const dir = process.env.FILE_STORAGE;
          if (!existsSync(dir)) mkdirSync(dir);
          return cb(null, dir);
        },
        filename: (_, file, cb) => {
          console.log({ file });
          return cb(null, Date.now().toString() + '_' + file.originalname);
        },
      }),
    }),
  )
  upload(@UploadedFiles() files: Array<File>) {
    console.log({ files });
    return files;
  }
}
