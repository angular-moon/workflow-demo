const fs = require('fs');
const path = require('path');
const paths = require('./paths');
const { lowerFirst } = require('lodash');

const root = path.join(paths.appPath, '..');

let packages = [];
if (path.parse(root).name === 'packages') packages = fs.readdirSync(root);

const packageSrcAbsPaths = packages.map(p => path.resolve(root, p, 'src'));

const packageAlias = packages.reduce((alias, package) => {
  alias[package] = path.join(package, 'src');
  return alias;
}, {});

module.exports = {
  packages,
  packageSrcAbsPaths,
  packageAlias,
};
