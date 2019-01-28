const inquirer = require('inquirer');

function inquirerPwd(message) {
  const questions = [
    {
      type: 'password',
      name: 'PASSWORD',
      message,
    },
  ];

  return inquirer.prompt(questions).then(answers => {
    return answers['PASSWORD'];
  });
}

module.exports = inquirerPwd;
