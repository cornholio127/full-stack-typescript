import { PoolConfig, Pool } from 'pg';
import { QueryFactory } from 'tsooq';
import { getLogger } from 'log4js';
import env from './env';

const config: PoolConfig = {
  host: env.dbHost,
  port: env.dbPort,
  database: env.dbName,
  user: env.dbUser,
  password: env.dbPassword,
};

const pool = new Pool(config);

export const create = QueryFactory.create(pool);
create.setLogger(getLogger());
