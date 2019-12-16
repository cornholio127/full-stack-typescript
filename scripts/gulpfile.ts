import { src, dest, series, task, TaskFunction } from 'gulp';
import { exec } from 'child_process';

const childProccessStdout = (s: string) => console.log(`\x1b[90m${s}\x1b[0m`);

const cmd = (shellCommand: string, workingDirectory: string): TaskFunction => cb => {
  const cp = exec(shellCommand, { cwd: workingDirectory });
  cp.stdout.on('data', childProccessStdout);
  cp.stderr.on('data', console.error);
  cp.on('exit', () => cb());
};

const buildService = (serviceName: string): TaskFunction => {
  const serviceNameCc = serviceName.split('-').map(n => n.substring(0, 1).toUpperCase() + n.substring(1)).join('');
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
const buildFederationService = buildService('federation-service');

const build = series(buildProductService, buildUserService, buildFederationService);

export default build;
