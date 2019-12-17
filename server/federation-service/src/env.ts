interface Env {
  userServiceHost: string;
  userServicePort: number;
  productServiceHost: string;
  productServicePort: number;
  orderServiceHost: string;
  orderServicePort: number;
  serverPort: number;
}

const env: Env = {
  userServiceHost: process.env.USER_SERVICE_HOST || 'localhost',
  userServicePort: Number(process.env.USER_SERVICE_PORT) || 9001,
  productServiceHost: process.env.PRODUCT_SERVICE_HOST || 'localhost',
  productServicePort: Number(process.env.PRODUCT_SERVICE_PORT) || 9002,
  orderServiceHost: process.env.ORDER_SERVICE_HOST || 'localhost',
  orderServicePort: Number(process.env.ORDER_SERVICE_PORT) || 9003,
  serverPort: Number(process.env.SERVER_PORT) || 9000,
};

export default env;
