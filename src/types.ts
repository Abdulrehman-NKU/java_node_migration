import { Prisma, PrismaClient, users } from '@prisma/client';
import { Property_To_String } from './util/types';
import { DefaultArgs } from '@prisma/client/runtime/library';

export type user_with_role_and_urls_with_id_as_bigInt = users & {
  rids: string;
  urls: string;
};

export type user_with_role_and_urls_with_id_as_string = Property_To_String<
  users,
  'id'
> & {
  rids: string;
  urls: string;
};

export type Prisma_Transaction = Omit<
  PrismaClient<Prisma.PrismaClientOptions, never, DefaultArgs>,
  '$connect' | '$disconnect' | '$on' | '$transaction' | '$use' | '$extends'
>;
