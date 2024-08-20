import { Injectable } from '@nestjs/common';
import { users } from '@prisma/client';
@Injectable()
export class Util_Service {
  CODE_CHARACTERS =
    '0123456789ABCdefghiDEFGHIJopPQRVWXYZabcjklSTUmnqrstKLMNOvuwxyz';

  tryCatchWrapper<T>(fn: (...args: any[]) => Promise<T | null> | T) {
    return async (...args: any[]): Promise<T> => {
      try {
        return await fn(...args);
      } catch (error) {
        console.error('An error occurred:', error.message + '\n');
        console.error('raw error', error);
        throw error; // rethrowing error after logging, customize as needed.
      }
    };
  }

  convertUserIdToString(user: users) {
    return { ...user, id: user.id.toString() };
  }

  createRandomCode(length: number) {
    let code = '';
    while (length >= 0) {
      const characterIdx = Math.floor(
        Math.random() * this.CODE_CHARACTERS.length,
      );
      code += this.CODE_CHARACTERS[characterIdx];
      length--;
    }
    return code;
  }
}
