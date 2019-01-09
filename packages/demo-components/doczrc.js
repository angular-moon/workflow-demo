/* bugs:
 * 依赖冲突: https://github.com/pedronauck/docz/issues/536
 * outside router: https://github.com/pedronauck/docz/pull/571
 */

const { packageSrcAbsPaths } = require('./config/packages');
const externals = require('./config/externals');
const getClientEnvironment = require('./config/env');

// test
process.env.REACT_APP_API_GATEWAY_BASE =
  'http://192.168.2.11:7300/mock/5c08b836666bcf1da5ef15fa/workflow-demo';

module.exports = {
  typescript: true,
  codeSandbox: false,
  wrapper: 'src/DoczWrapper',
  indexHtml: 'public/index.docz.html',
  // docz 内部也用了 react-hot-loader, 重复了
  modifyBabelRc: (babelrc, args) => {
    return {
      ...babelrc,
      plugins: babelrc.plugins.filter(plugin => plugin !== 'react-hot-loader/babel'),
    };
  },
  modifyBundlerConfig: (config, dev, args) => {
    // 外部依赖
    config.externals = { ...externals };
    // docz 目前的bug还没有修复, router 暂时不作为外部依赖
    // https://github.com/pedronauck/docz/pull/571
    delete config.externals['react-router-dom'];
    // 让babel 编译common/src中的文件
    delete config.module.rules[1].exclude;
    config.module.rules[1].include.push(...packageSrcAbsPaths);

    return config;
  },
};
