import { Injectable } from '@nestjs/common';
import * as crypto from 'crypto';

@Injectable()
export class Password_Service {
  // This method takes the password as a string and returns the MD5 hash in hexadecimal format
  hashPassword(password: string): string {
    return crypto.createHash('md5').update(password).digest('hex');
  }

  checkPasswordCorrect(password: string, hashedPassword: string) {
    return this.hashPassword(password) === hashedPassword;
  }
}
