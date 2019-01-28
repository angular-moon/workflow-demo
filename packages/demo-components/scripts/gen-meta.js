const fs = require('fs-extra');
const path = require('path');
const chalk = require('chalk');
const { mapValues, forEach } = require('lodash');

const paths = require('../config/paths');
const exportComponents = require('../config/exportComponents');

/**
 * 排除 redux 注入的 props 和 第三方库的props
 * @param {Object} prop 组件的prop元数据
 */
const propFilter = prop => {
  const parentName = prop.parent && prop.parent.name;
  // redux props
  const reduxProps = parentName === 'DispatchProps' || parentName === 'StateProps';
  // lib props
  const libProps = prop.parent && prop.parent.fileName.includes('node_modules');
  return !reduxProps && !libProps;
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
  const meta = flagWorkflow(metaRaw);
  return meta;
};

/**
 * 保存元数据
 * @param {string} componentName 组件名称
 * @param {Object} meta 元数据
 */
const writeFile = (componentName, meta) => {
  fs.writeFileSync(path.join(paths.appBuild, 'meta', `${componentName}.json`), meta);
};

function run() {
  console.log(chalk.yellow('提取组件元数据...'));
  const metaPath = path.join(paths.appBuild, 'meta');
  fs.mkdirsSync(metaPath);
  fs.emptyDirSync(metaPath);
  forEach(exportComponents, (component, componentName) => {
    /**
     *  优先级依次递减
     */
    const file = tsxFile(component) || sameNameFile(component) || indexFile(component);
    if (file) {
      const meta = parseFile(file);
      writeFile(componentName, JSON.stringify(meta, null, 2));
      console.log(chalk.cyan(componentName));
    }
  });
  console.log(chalk.yellow('提取组件元数据完成!'));
}

run();
