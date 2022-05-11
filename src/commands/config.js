const userInfos = {};
const readline = require('readline');
const ask = readline.createInterface(
  {
    input: process.stdin,
    output: process.stdout
  });
/**
 * Method to configure user information
 */

const conf = () => {
  console.log("This walk-trough will guide you through creating your personal information's details",
    '\n',
    '\nSee bd_mailer help init for more documented about this command fields',
    '\n',
    '\nPress ^C to exit at anytime'
  );
  userInfos.name = ask('\t User name : (test)\t');
  userInfos.gram = ask('\t Telegram pseudo : (tester)\t');
  userInfos.what = ask('\t Whatsapp pseudo : (tester)\t');
  userInfos.email = ask('\t Email address : (tester@gmail.com)\t');
};

module.exports = conf;
