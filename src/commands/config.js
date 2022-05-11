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
    userInfos.name = ask.question('\t User name : (test)\t', (target) => {
        target ? console.log(`Name is ${target}`) : console.log(`Name is ${userInfos.name = 'test'}`);
        ask.close();
    });
    userInfos.gram = ask.question('\t Telegram pseudo : (tester)\t', (target) => {
        target ? console.log(`Pseudo is ${target}`) : console.log(`Pseudo is ${userInfos.gram = 'tester'}`);
        ask.close();
    });
    //userInfos.what = ask.question('\t Whatsapp pseudo : (tester)\t', saver(this.value));
    //userInfos.email = ask.question('\t Email address : (tester@gmail.com)\t', saver(this.value));
};

module.exports = conf;
