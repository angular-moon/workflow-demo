const path = require('path');
const template = require('./styleguide.template');
const externals = require('./config/externals');
const { packageSrcAbsPaths } = require('./config/packages');

const dev = process.env.NODE_ENV === 'development';
const webpackConfig = dev
  ? require('./config/webpack.config.dev')
  : require('./config/webpack.config.prod');

module.exports = {
  components: ['src/components/Alert/*.tsx', 'src/components/ApplyView/*.tsx'],
  propsParser: require('react-docgen-typescript').parse,
  webpackConfig,
  template,
  usageMode: 'expand',
  pagePerSection: true,
  dangerouslyUpdateWebpackConfig(webpackConfig, env) {
    // WARNING: inspect Styleguidist Webpack config before modifying it, otherwise you may break Styleguidist
    webpackConfig.externals = externals();
    return webpackConfig;
  },
    styleguideComponents: {
      Wrapper: path.join(__dirname, 'src/DocWrapper.tsx')
    }
};
