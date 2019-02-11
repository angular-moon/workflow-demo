const path = require('path');
const paths = require('./paths');

// 要导出的组件
const exportComponentNames = ['ApplyForm', 'ApplyView'];

// 规约为 { component: componentPath }
const exportComponents = exportComponentNames.reduce((components, component) => {
  components[component] = path.join(paths.appSrc, 'components', component);
  return components;
}, {});

module.exports = exportComponents;
