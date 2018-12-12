const { packageSrcAbsPaths } = require('./config/packages');
const externals = require('./config/externals');

// test
process.env.REACT_APP_API_GATEWAY_BASE =
  'http://192.168.2.11:7300/mock/5c08b836666bcf1da5ef15fa/workflow-demo';

module.exports = {
  typescript: true,
  wrapper: 'src/wrapper',
  indexHtml: 'public/index.docz.html',
  modifyBundlerConfig: (config, dev, args) => {
    // 外部依赖
    config.externals = externals;
    // 让babel 编译common/src中的文件
    delete config.module.rules[1].exclude;
    config.module.rules[1].include.push(...packageSrcAbsPaths);

    return config;
  },
};
