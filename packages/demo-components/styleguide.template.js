const cdnServer = 'http://cdn.gmsoftdev.com';

const scripts = [
  'polyfill/1.0.0/polyfill.js',
  'react/16.7.0-alpha.2/react.development.js',
  'react-dom/16.7.0-alpha.2/react-dom.development.js',
  'moment/2.22.2/moment.js',
  'moment/2.22.2/locale.zh-cn.js',
  'moment/use-locale.js',
  'antd/3.10.9/antd.js',
  'styled-components/4.1.1/styled-components.js',
  'history/4.7.2/history.js',
  'react-router-dom/4.4.0-beta.6/react-router-dom.js',
  'redux/4.0.1/redux.js',
  'redux-saga/0.16.2/redux-saga.js',
  'react-router-redux/4.0.8/ReactRouterRedux.js',
  'react-redux/5.1.1/react-redux.js',
  'redux-actions/2.6.4/redux-actions.js',
  'reselect/4.0.0/reselect.js',
  'react-virtualized/9.21.0/react-virtualized.js',
  'react-virtualized-tree/2.0.2/react-virtualized-tree.js',
  'dva-core/1.5.0-beta.2/dva-core.js',
  'immer/1.8.0/immer.umd.js',
  'state-container/1.0.0/state-container.js',
  'axios/0.18.0/axios.js',
  'systemjs/0.21.5/system.src.js',
];

module.exports = {
  head: {
    links: [
      {
        rel: 'stylesheet',
        href: 'http://cdn.gmsoftdev.com/??antd/3.10.9/antd.css,antd/3.10.9/custom-antd.css',
      },
    ],
    scripts: scripts.map(script => ({
      crossorigin: 'anonymous',
      src: `${cdnServer}/${script}`,
    })),
  },
};
