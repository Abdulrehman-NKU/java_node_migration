import { Module } from '@nestjs/common';
import { FileSystemService } from './file_system.service';
import { FileSystemController } from './file_system.controller';

@Module({
  controllers: [FileSystemController],
  providers: [FileSystemService],
})
export class FileSystemModule {}
