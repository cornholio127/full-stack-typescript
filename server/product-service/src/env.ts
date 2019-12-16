interface Env {
  dbHost: string;
  dbPort: number;
  dbName: string;
  dbUser: string;
  dbPassword: string;
  serverPort: number;
}

const env: Env = {
  dbHost: process.env.DB_HOST || 'localhost',
  dbPort: Number(process.env.DB_PORT) || 5432,
  dbName: process.env.DB_NAME || 'shop',
  dbUser: process.env.DB_USER || 'api_user',
  dbPassword: process.env.DB_PASSWORD || 'password',
  serverPort: Number(process.env.SERVER_PORT) || 9002,
};

export default env;
