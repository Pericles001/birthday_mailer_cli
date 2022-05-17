const mails = require('./email')
const ask = require("./config");
/**
 * Script for whatsapp credential configuration
 */

const whatsapp = () => ask.question('\t Whatsapp pseudo : (tester)\t', (target) => {
    target ? console.log(`Pseudo is ${userInfos.what = target}`) : console.log(`Pseudo is ${userInfos.what = 'tester'}`);
    mails();
});

module.exports = whatsapp;