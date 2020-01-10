import { src, dest, series, task, TaskFunction } from 'gulp';
import { exec } from 'child_process';

const childProccessStdout = (s: string) => console.log(`\x1b[90m${s}\x1b[0m`);

const cmd = (shellCommand: string, workingDirectory: string): TaskFunction => cb => {
  const cp = exec(shellCommand, { cwd: workingDirectory });
  cp.stdout.on('data', childProccessStdout);
  cp.stderr.on('data', console.error);
  cp.on('exit', () => cb());
};

const camelCase = (s: string): string => s.split('-').map(n => n.substring(0, 1).toUpperCase() + n.substring(1)).join('');

task('buildDatabase', cmd('docker build -t shop-database .', '../docker/database'));

const installService = (serviceName: string) => task(`install${camelCase(serviceName)}`, cmd('npm install', `../server/${serviceName}`));

installService('product-service');
installService('user-service');
installService('order-service');
installService('federation-service');

export const installServices = series('installProductService', 'installUserService', 'installOrderService', 'installFederationService');

const removeServiceImage = (serviceName: string) => task(`remove${camelCase(serviceName)}Image`, cmd(`docker rmi shop-${serviceName}`, '.'));

removeServiceImage('product-service');
removeServiceImage('user-service');
removeServiceImage('order-service');
removeServiceImage('federation-service');

export const removeServiceImages = series('removeProductServiceImage', 'removeUserServiceImage', 'removeOrderServiceImage', 'removeFederationServiceImage');

const buildService = (serviceName: string): TaskFunction => {
  const serviceNameCc = camelCase(serviceName);
  const serviceProject = `../server/${serviceName}`;
  const serviceDocker = `../docker/${serviceName}`;
  const dockerImage = `shop-${serviceName}`;
  task(`build${serviceNameCc}`, cmd('npm run build', serviceProject));
  task(`copy${serviceNameCc}PackageJson`, () => src(`${serviceProject}/package*.json`).pipe(dest(`${serviceDocker}/build`)));
  task(`copy${serviceNameCc}Dist`, () => src(`${serviceProject}/dist/**/*`).pipe(dest(`${serviceDocker}/build/dist`)));
  task(`build${serviceNameCc}Docker`, cmd(`docker build -t ${dockerImage} .`, serviceDocker));
  return series(`build${serviceNameCc}`, `copy${serviceNameCc}PackageJson`, `copy${serviceNameCc}Dist`, `build${serviceNameCc}Docker`);
};

const buildProductService = buildService('product-service');
const buildUserService = buildService('user-service');
const buildOrderService = buildService('order-service');
const buildFederationService = buildService('federation-service');

export const buildServices = series(buildProductService, buildUserService, buildOrderService, buildFederationService);

export const rebuildServices = series(removeServiceImages, buildServices);

task('installClient', cmd('npm install', '../client'));
const buildClient = (() => {
  task('buildClient', cmd('npm run build', '../client'));
  task('copyClient', () => src('../client/build/**/*').pipe(dest('../docker/frontend-proxy/build')));
  return series('buildClient', 'copyClient');
})();
task('buildFrontendProxyDocker', cmd('docker build -t shop-frontend-proxy .', '../docker/frontend-proxy'));
export const buildFrontendProxy = series('installClient', buildClient, 'buildFrontendProxyDocker');

task('removeCmsImage', cmd('docker rmi cms', '.'));
task('buildCmsDatabase', cmd('docker build -t cms-database .', '../docker/cms/database'));
task('installCms', cmd('npm install', '../cms'));
task('compileCms', cmd('npm run prodbuild', '../cms'));
task('copyCmsPackageJson', () => src('../cms/package*.json').pipe(dest(`../docker/cms/server/build`)));
task('copyCmsApi', () => src('../cms/api/**/*').pipe(dest('../docker/cms/server/build/api')));
task('copyCmsBuild', () => src('../cms/build/**/*').pipe(dest('../docker/cms/server/build/build')));
task('copyCmsComponents', () => src('../cms/components/**/*').pipe(dest('../docker/cms/server/build/components')));
task('copyCmsConfig', () => src('../cms/config/**/*').pipe(dest('../docker/cms/server/build/config')));
task('copyCmsExports', () => src('../cms/exports/**/*').pipe(dest('../docker/cms/server/build/exports')));
task('copyCmsExtensions', () => src('../cms/extensions/**/*').pipe(dest('../docker/cms/server/build/extensions')));
task('copyCmsPublic', () => src('../cms/public/**/*').pipe(dest('../docker/cms/server/build/public')))
task('buildCmsDocker', cmd('docker build --no-cache -t cms .', '../docker/cms/server'));
export const buildCms = series('installCms', 'compileCms', 'copyCmsPackageJson', 'copyCmsApi', 'copyCmsBuild', 'copyCmsComponents', 'copyCmsConfig', 'copyCmsExports', 'copyCmsExtensions', 'copyCmsPublic', 'buildCmsDocker');

export default rebuildServices;
