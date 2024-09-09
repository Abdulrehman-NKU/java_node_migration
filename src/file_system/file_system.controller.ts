import {
  Controller,
  Post,
  UseInterceptors,
  UploadedFiles,
} from '@nestjs/common';
import { AnyFilesInterceptor } from '@nestjs/platform-express';
import { Multer_Disk_Storage } from 'src/config';

@Controller('file')
export class FileSystemController {
  @Post('upload')
  @UseInterceptors(
    AnyFilesInterceptor({
      storage: Multer_Disk_Storage,
    }),
  )
  upload(@UploadedFiles() files: Array<File>) {
    return files;
  }
}
