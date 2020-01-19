interface Env {
  dbHost: string;
  dbPort: number;
  dbName: string;
  dbUser: string;
  dbPassword: string;
  serverPort: number;
  jwtSecret: string;
}

const env: Env = {
  dbHost: process.env.DB_HOST || 'localhost',
  dbPort: Number(process.env.DB_PORT) || 5432,
  dbName: process.env.DB_NAME || 'shop',
  dbUser: process.env.DB_USER || 'api_user',
  dbPassword: process.env.DB_PASSWORD || 'password',
  serverPort: Number(process.env.SERVER_PORT) || 9001,
  jwtSecret: process.env.JWT_SECRET || 's3cret',
};

export default env;
