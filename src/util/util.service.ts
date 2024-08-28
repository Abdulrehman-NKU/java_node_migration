import { Injectable, BadRequestException } from '@nestjs/common';
import { users } from '@prisma/client';
import { PrismaClientKnownRequestError } from '@prisma/client/runtime/library';
import { Prisma_Service } from 'src/prisma/prisma.service';
import { Prisma_Transaction } from 'src/types';
@Injectable()
export class Util_Service {
  constructor(private prisma: Prisma_Service) {}
  CODE_CHARACTERS =
    '0123456789ABCdefghiDEFGHIJopPQRVWXYZabcjklSTUmnqrstKLMNOvuwxyz';

  tryCatchWrapper<T>(fn: (...args: any[]) => Promise<T | null> | T) {
    return async (...args: any[]): Promise<T> => {
      try {
        return await fn(...args);
      } catch (error) {
        if (error instanceof PrismaClientKnownRequestError) {
          throw new BadRequestException({ ...error });
        }
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

  async use_tranaction<T = unknown>(
    fn: (tx: Prisma_Transaction) => Promise<T>,
    tx: Prisma_Transaction = null,
  ) {
    return this.prisma.$transaction(async (new_tx) => {
      return await fn(tx ?? new_tx);
    });
  }
}
