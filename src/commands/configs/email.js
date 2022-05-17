//import {ask, userInfos} from "./parameters";
const param = require('./parameters');
/**
 * Script for email configs
 */

const mail = () => ask.question('\t Email address : (tester@gmail.com)\t', (target) => {
    target ? console.log(`Pseudo is ${userInfos.mail = target}`) : console.log(`Pseudo is ${userInfos.mail = 'tester@gmail.com'}`);
    ask.close();
});

module.exports = mail