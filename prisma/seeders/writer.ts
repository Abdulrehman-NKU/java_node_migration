/**
 * Note this file read from a db which has the data you want to seed into the new db
 * This will create the custom data file which would have the data that we need to insert into the new schema
 */

import { PrismaClient } from '@prisma/client';
import { createWriteStream } from 'node:fs';
import { join } from 'node:path';
import { Readable } from 'node:stream';
const client = new PrismaClient();

function parse_big_int_to_string(data) {
  if (!data) return data;
  else if (data.constructor === Array)
    return data.map((d) => convert_record_big_int_property_to_string(d));
  return convert_record_big_int_property_to_string(data);
}

function convert_record_big_int_property_to_string(data: Record<string, any>) {
  for (let k in data) {
    // typeof null is object
    if (typeof data[k] === 'object' && data[k] !== null)
      data[k] = parse_big_int_to_string(data[k]);
    else if (typeof data[k] === 'bigint') data[k] = data[k].toString();
  }
  return data;
}

const seed = async () => {
  await client.$connect();

  const fun_api = await client.fun_api.findMany();
  const roles = await client.role.findMany();
  const roles_category = await client.role_category.findMany();
  const role_fun_api = await client.role_fun_api.findMany();

  const rs = Readable.from(
    Buffer.from(
      `
    export const fun_api_data = ${JSON.stringify(parse_big_int_to_string(fun_api))} \n
    export const roles_data = ${JSON.stringify(parse_big_int_to_string(roles))} \n
    export const roles_category_data = ${JSON.stringify(parse_big_int_to_string(roles_category))} \n
    export const role_fun_api_data = ${JSON.stringify(parse_big_int_to_string(role_fun_api))} \n
    `,
      'utf-8',
    ),
  );
  const ws = createWriteStream(join(__dirname, 'seed_data.ts'), {
    flags: 'w',
    encoding: 'utf-8',
  });

  rs.pipe(ws);

  ws.on('finish', () => {
    console.log('Data written finished');
  });
};

seed().catch((e) => {
  console.error(e);
  client.$disconnect();
});
