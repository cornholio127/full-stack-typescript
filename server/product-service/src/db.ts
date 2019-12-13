import { PoolConfig, Pool } from 'pg';
import { QueryFactory } from 'tsooq';
import { getLogger } from 'log4js';

const config: PoolConfig = {
  host: 'localhost',
  port: 5432,
  database: 'shop',
  user: 'api_user',
  password: 'password',
};

const pool = new Pool(config);

export const create = QueryFactory.create(pool);
create.setLogger(getLogger());
