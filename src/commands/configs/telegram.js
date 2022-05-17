const whats = require("./whatsapp");
const ask = require("./config");
/**
 * Script for telegram configuration
 */

const telegram = () => ask.question('\t Telegram pseudo : (tester)\t', (target) => {
    target ? console.log(`Pseudo is ${userInfos.gram = target}`) : console.log(`Pseudo is ${userInfos.gram = 'tester'}`);
    whats();
});

module.exports = telegram;