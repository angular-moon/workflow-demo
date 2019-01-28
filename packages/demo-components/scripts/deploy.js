process.env.BABEL_ENV = 'production';
process.env.NODE_ENV = 'production';

const zip = require('./utils/zip');
const scp = require('./utils/scp');
const loadDeployEnv = require('./utils/load-deploy-env');
const paths = require('../config/paths');

const DEPLOY_TYPE = {
  ZIP: 'zip',
  SCP: 'scp',
};

/**
 * 支持2种部署模式
 * scp: 使用scp复制文件到指定的目标服务器
 * zip: 在本地生成打包文件, 需要手动部署到目标服务器
 */
async function deploy() {
  // 部署信息
  const deployType = process.env.REACT_APP_DEPLOY_TYPE || DEPLOY_TYPE.ZIP;
  const deployInfos = process.env.REACT_APP_DEPLOY_INFOS
    ? JSON.parse(process.env.REACT_APP_DEPLOY_INFOS)
    : [];

  switch (deployType) {
    case DEPLOY_TYPE.ZIP:
      zip(paths.appBuild);
      break;
    case DEPLOY_TYPE.SCP:
      for (const deployInfo of deployInfos) {
        await scp(
          paths.appBuild,
          {
            host: deployInfo.host,
            username: deployInfo.username,
            password: deployInfo.password,
            privateKey: deployInfo.privateKey,
            passphrase: deployInfo.passphrase,
            path: deployInfo.remotePath,
          },
          true
        );
      }
      break;
  }
}

async function run() {
  await loadDeployEnv();
  deploy();
}

run();
