import { PrismaClient } from '@prisma/client';
import {
  fun_api_data,
  roles_data,
  role_fun_api_data,
  roles_category_data,
} from './seed_data';

const seed = async () => {
  const client = new PrismaClient();
  await client.$connect();

  await client.fun_api.createMany({
    data: fun_api_data.map((f) => ({ ...f, id: BigInt(f.id) })),
    skipDuplicates: true,
  });

  await client.role_category.createMany({
    data: roles_category_data.map((f) => ({ ...f, Id: BigInt(f.Id) })),
    skipDuplicates: true,
  });

  await client.role.createMany({
    data: roles_data.map((f) => ({
      ...f,
      id: BigInt(f.id),
      parent_id: BigInt(f.parent_id),
      create_id: BigInt(f.create_id),
    })),
    skipDuplicates: true,
  });

  await client.role_fun_api.createMany({
    data: role_fun_api_data.map((f) => ({
      ...f,
      id: BigInt(f.id),
      role_id: BigInt(f.role_id),
      fun_api_id: BigInt(f.fun_api_id),
    })),
    skipDuplicates: true,
  });

  await client.$disconnect();
};

seed()
  .then(() =>
    console.log(
      '*************Done************\n*************seed_fun_api.ts************',
    ),
  )
  .catch((e) => console.log(e))
  .finally(() => 'Client Disconnected');
