import {whatsapp} from "./whatsapp.js";
import {conf} from "./config.js";
/**
 * Script for telegram configuration
 */

const telegram = () => conf.question('\t Telegram pseudo : (tester)\t', (target) => {
    target ? console.log(`Pseudo is ${userInfos.gram = target}`) : console.log(`Pseudo is ${userInfos.gram = 'tester'}`);
    whatsapp();
});

export { telegram };