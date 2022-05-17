import {mail} from "./email.js";
import {conf} from "./config.js";
/**
 * Script for whatsapp credential configuration
 */

const whatsapp = () => conf.question('\t Whatsapp pseudo : (tester)\t', (target) => {
    target ? console.log(`Pseudo is ${userInfos.what = target}`) : console.log(`Pseudo is ${userInfos.what = 'tester'}`);
    mail();
});

export {whatsapp};