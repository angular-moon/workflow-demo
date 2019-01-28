process.env.BABEL_ENV = 'production';
process.env.NODE_ENV = 'production';

const fs = require('fs');
const path = require('path');
const inquirer = require('inquirer');
const paths = require('../../config/paths');

// 环境变量配置文件
const envFiles = fs.readdirSync(path.dirname(paths.dotenv));
// 可以发布的目标环境选项
const choices = envFiles.filter(file => file.includes('.env.')).map(file => file.split('.')[2]);

/**
 * 加载配置文件中的配置到 process.env
 * @param {string} whichDeploy - 发布目标环境
 */
function loadEnv(whichDeploy) {
  // 设置标识, 确定使用哪一个配置文件
  process.env.DEPLOY_ENV = whichDeploy;
  // 加载配置文件中的配置到 process.env
  require('../../config/env');
}

function load() {
  // 尝试从命令行参数中获取 发布目标环境
  const whichDeploy = process.argv[2];
  /**
   * 从参数中获取了有效的目标名称直接使用
   * 否则询问需要发布到哪里?
   */
  return new Promise((resolve, reject) => {
    if (whichDeploy && choices.includes(whichDeploy)) {
      loadEnv(whichDeploy);
      resolve(whichDeploy);
    } else {
      if (whichDeploy) console.log(chalk.cyan('项目中没有你指定的发布环境配置, 请选择!'));
      const questions = [
        {
          type: 'list',
          name: 'WHICH_DEPLOY',
          message: '你想要发布到哪个环境?',
          choices,
        },
      ];

      inquirer.prompt(questions).then(answers => {
        loadEnv(answers['WHICH_DEPLOY']);
        resolve(answers['WHICH_DEPLOY']);
      });
    }
  });
}

module.exports = load;
