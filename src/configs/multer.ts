import { BadRequestException } from '@nestjs/common';
import { Request } from 'express';
import { existsSync, mkdirSync } from 'fs';
import { diskStorage } from 'multer';
import { ParsedQs } from 'qs';

export const Multer_Disk_Storage = (
  fn: (
    req: Request<any, any, any, ParsedQs, Record<string, any>>,
  ) => string | undefined = () => '',
  isPublic = false,
) =>
  diskStorage({
    destination: (req, file, cb) => {
      const dir =
        (isPublic ? 'public/' : '') +
        (process.env.FILE_STORAGE + '/' + fn(req) ?? '');
      if (!existsSync(dir)) mkdirSync(dir, { recursive: true });
      return cb(null, dir);
    },
    filename: (_, file, cb) => {
      return cb(null, Date.now().toString() + '_' + file.originalname);
    },
  });
