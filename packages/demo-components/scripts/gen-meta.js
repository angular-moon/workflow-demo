const fs = require('fs');
const path = require('path');
const { mapValues, forEach, omitBy, flowRight: compose } = require('lodash');

const paths = require('../config/paths');
const exportComponents = require('../config/exportComponents');

/**
 * 排除 redux 注入的 props
 * @param {Object} prop 组件的prop元数据
 */
const propFilter = prop => {
  const parentName = prop.parent && prop.parent.name;
  const reduxProps = parentName === 'DispatchProps' || parentName === 'StateProps';
  return !reduxProps;
};

const docgen = require('react-docgen-typescript').withCustomConfig(paths.appTsConfig, {
  propFilter,
});

/**
 * 为 props 增加 workflow 标识
 * 删除描述中的 `@workflow`
 * 增加属性 workflowFlag: true
 * @param {Object} meta 元数据
 */
const flagWorkflow = meta => {
  const flag = '@workflow';
  const props = mapValues(meta.props, prop => {
    if (prop.description.includes(flag)) {
      return {
        ...prop,
        description: prop.description.replace(flag, ''),
        workflowFlag: true,
      };
    } else {
      return prop;
    }
  });

  return { ...meta, props };
};

/**
 * 去掉 prop.parent.fileName 不是当前源文件的 prop
 * @param {string} file 当前被解析的源文件 path
 * @param {Object} meta 元数据
 */
const omitParentFileNotSelf = file => meta => {
  const props = omitBy(meta.props, prop => {
    return prop.parent && path.normalize(prop.parent.fileName) !== path.normalize(file);
  });
  return { ...meta, props };
};

/**
 * 判断 path 是不是 tsx 文件
 * 如果是返回包含扩展名的完整路径
 * 否则返回 null
 * @param {string} file 源文件路径
 */
const tsxFile = file => {
  // 自动增加的文件后缀
  const ext = '.tsx';
  const _file = file.endsWith(ext) ? file : `${file}${ext}`;
  try {
    return fs.statSync(_file).isFile() ? _file : null;
  } catch (e) {
    return null;
  }
};

/**
 * 判断 目录下是否有同名的文件
 * @param {string} directory 源文件所在目录
 */
const sameNameFile = directory => {
  try {
    if (!fs.statSync(directory).isDirectory()) return null;
  } catch (e) {
    return null;
  }
  return tsxFile(path.join(directory, path.basename(directory)));
};

/**
 * 判断 目录下是否有index.tsx
 * @param {string} directory 源文件所在目录
 */
const indexFile = directory => {
  try {
    if (!fs.statSync(directory).isDirectory()) return null;
  } catch (e) {
    return null;
  }
  return tsxFile(path.join(directory, 'index'));
};

/**
 * 解析文件, 生成元数据
 * @param {string} file 源文件
 */
const parseFile = file => {
  const metaRaw = docgen.parse(file)[0];
  const meta = compose(
    omitParentFileNotSelf(file),
    flagWorkflow
  )(metaRaw);
  return meta;
};

const writeFile = (componentName, meta) => {
  fs.writeFileSync(path.join(paths.appBuild, 'meta', `${componentName}.json`), meta);
};

//递归创建目录 同步方法
function mkdirsSync(dirname) {
  //console.log(dirname);
  if (fs.existsSync(dirname)) {
    return true;
  } else {
    if (mkdirsSync(path.dirname(dirname))) {
      fs.mkdirSync(dirname);
      return true;
    }
  }
}

const metaPath = path.join(paths.appBuild, 'meta');
mkdirsSync(metaPath);
forEach(exportComponents, (component, componentName) => {
  /**
   *  优先级依次递减
   */
  const file = tsxFile(component) || sameNameFile(component) || indexFile(component);
  if (file) {
    const meta = parseFile(file);
    writeFile(componentName, JSON.stringify(meta, null, 2));
  }
});
