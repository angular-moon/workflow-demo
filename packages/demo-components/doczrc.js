/* bugs:
 * 依赖冲突: https://github.com/pedronauck/docz/issues/536
 * outside router: https://github.com/pedronauck/docz/pull/571
 */

// docz 没有提供模板文件变量替换的, 只好自己生成然后写文件
// 生成模板文件 public/docz.index.html
require('./docz.template');
const webpack = require('webpack');
const { packageSrcAbsPaths } = require('./config/packages');
const externals = require('./config/externals');
const getClientEnvironment = require('./config/env');

const publicUrl = process.env.REACT_APP_PUBLIC_URL;
const env = getClientEnvironment(publicUrl);
const docPath = 'doc';

module.exports = {
  base: `${publicUrl}/${docPath}`,
  dest: `build/${docPath}`,
  typescript: true,
  codeSandbox: false,
  hashRouter: true,
  wrapper: 'src/DocWrapper',
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
    config.externals = externals();
    // docz 目前的bug还没有修复, router 暂时不作为外部依赖
    // https://github.com/pedronauck/docz/pull/571
    delete config.externals['react-router-dom'];
    // 让babel 编译common/src中的文件
    delete config.module.rules[1].exclude;
    config.module.rules[1].include.push(...packageSrcAbsPaths);
    // 加入 env/* 下的配置
    config.plugins.push(new webpack.DefinePlugin(env.stringified));

    return config;
  },
};
