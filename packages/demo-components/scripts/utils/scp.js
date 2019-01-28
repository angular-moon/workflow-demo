const fs = require('fs');
const nodeJsPath = require('path');
const scp2 = require('scp2');
const chalk = require('chalk');
const inquirerPwd = require('./inquirer-pwd');

/**
 * 执行scp命令
 * @param {string} srcPath - 本地目录或文件
 * @param {Object} dest - {
    port = 22,  // ssh 端口号
    host,       // 服务器地址
    username,   // 登录用户名
    password,   // 密码
    privateKey, // 私钥文件路径
    passphrase, // 私钥密码
    path,       // 上传到服务器的路径
  },
 * @param {boolean} verbose - 是否打印传输日志
 */
function scpExec(
  srcPath,
  { port, host, username, password, privateKey, passphrase, path },
  verbose
) {
  return new Promise((resolve, reject) => {
    /**
     * 读取从文件私钥
     */
    if (privateKey) {
      privateKey = fs.readFileSync(nodeJsPath.normalize(privateKey));
    }

    const sshClient = new scp2.Client({
      port,
      host,
      username,
      password,
      privateKey,
      passphrase,
    });
    let startTime;
    let endTime;
    // 链接成功flag
    let connectSuccess = false;

    sshClient.on('ready', function() {
      connectSuccess = true;
      startTime = new Date();
      console.log(chalk.cyan(host + ' [开始上传] ' + startTime));
    });

    if (verbose)
      sshClient.on('write', function(p) {
        console.log(chalk.yellow(p.source + ' => ' + host + '@' + p.destination));
      });

    sshClient.on('end', function() {
      endTime = new Date();
      if (connectSuccess) console.log(chalk.cyan(host + ' [上传结束] ' + new Date()));
    });

    sshClient.on('error', function(err) {
      reject(`${host}: ${err}`);
    });

    sshClient.on('close', function() {
      if (connectSuccess) {
        console.log(chalk.cyan(host + ' 上传用时: [' + (+endTime - +startTime) / 1000 + '] 秒!'));
        resolve();
      }
    });

    scp2.scp(srcPath, { path }, sshClient, function(err) {
      if (err) {
        reject(`${host}: ${err}`);
      }
    });
  });
}

/**
 * 拷贝文件到目标服务器
 * ssh 默认使用端口 22
 * 如果没有配置密码, 会提示输入用户密码或私钥密码
 * @param {string} srcPath - 本地目录或文件
 * @param {Object} dest - {
    port = 22,  // ssh 端口号
    host,       // 服务器地址
    username,   // 登录用户名
    password,   // 密码
    privateKey, // 私钥文件路径
    passphrase, // 私钥密码
    path,       // 上传到服务器的路径
  },
 * @param {boolean} verbose - 是否打印传输日志
 *
 */
async function scp(
  srcPath,
  { port = 22, host, username, password, privateKey, passphrase, path },
  verbose
) {
  if (!host) {
    return console.log(chalk.red('请配置上传目标服务器 host'));
  }
  if (!username) {
    return console.log(chalk.red('请配置上传目标服务器 username'));
  }

  /**
   * 提示需要服务器登录密码
   */
  if (!privateKey && !password) {
    password = await inquirerPwd(`请输入 ${host} 的密码?`);
  }

  /**
   * 提示需要私钥密码,
   * 如果私钥没有密码, 并且希望跳过此步, 请配置为空字符串
   */
  if (privateKey && passphrase === undefined) {
    passphrase = await inquirerPwd(`请输入 ${host} 的私钥密码?`);
  }

  try {
    await scpExec(
      srcPath,
      { port, host, username, password, privateKey, passphrase, path },
      verbose
    );
  } catch (err) {
    console.log(chalk.red(`[scp error] ${err}`));
  }
}

module.exports = scp;
