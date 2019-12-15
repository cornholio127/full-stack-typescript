import { src, dest, series, task, TaskFunction } from 'gulp';
import { exec } from 'child_process';

const SERVER = '../server';
const DOCKER = '../docker';
const PRODUCT_SERVICE = `${SERVER}/product-service`;
const PRODUCT_SERVICE_DOCKER = `${DOCKER}/product-service`;

const childProccessStdout = (s: string) => console.log(`\x1b[90m${s}\x1b[0m`);

const cmd = (shellCommand: string, workingDirectory: string): TaskFunction => cb => {
  const cp = exec(shellCommand, { cwd: workingDirectory });
  cp.stdout.on('data', childProccessStdout);
  cp.stderr.on('data', console.error);
  cp.on('exit', () => cb());
};

task('buildProductService', cmd('npm run build', PRODUCT_SERVICE));
task('copyProductServicePackageJson', () => src(`${PRODUCT_SERVICE}/package*.json`).pipe(dest(`${PRODUCT_SERVICE_DOCKER}/build`)));
task('copyProductServiceDist', () => src(`${PRODUCT_SERVICE}/dist/**/*`).pipe(dest(`${PRODUCT_SERVICE_DOCKER}/build/dist`)));
task('buildProductServiceDocker', cmd('docker build -t shop-product-service .', PRODUCT_SERVICE_DOCKER));

const productService = series('buildProductService', 'copyProductServicePackageJson', 'copyProductServiceDist', 'buildProductServiceDocker');

export default productService;
