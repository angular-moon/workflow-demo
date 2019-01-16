/**
 * docz 0.13.7 版本的bug, 和 react-scripts 的依赖冲突了
 * https://github.com/pedronauck/docz/issues/536#issuecomment-449601804
 * 官方目前没有解决, 用脚本临时解决这个问题
 */
const path = require('path');
const child_process = require('child_process');
const fs = require('fs');

const doczPath = path.join(__dirname, '../../../', 'node_modules/docz-core');
const doczPkgPath = path.join(doczPath, 'package.json');
const doczPkgFile = require(doczPkgPath);

if (doczPkgFile.resolutions) return;

doczPkgFile.resolutions = {
  'ansi-styles': '^3.2.0',
};

fs.writeFileSync(doczPkgPath, JSON.stringify(doczPkgFile, null, '\t'));

console.log('fixs docz-core pkg..., 大约70s, 请耐心等待~');
child_process.execSync('yarn', { cwd: doczPath });
console.log('fixs docz-core pkg done!');
