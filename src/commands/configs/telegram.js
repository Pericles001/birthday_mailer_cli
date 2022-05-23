import {whatsapp, whatsappTgt} from "./whatsapp.js";
import {ask, targetInfos, userInfos} from "./parameters.js";

/**
 * Script for telegram configuration
 */

const telegram = () => ask.question('\t Telegram pseudo : (tester)\t', (target) => {
    target ? userInfos.gram = target : userInfos.gram = 'tester';
    whatsapp();
});

const telegramTgt = () => ask.question('\t Telegram pseudo : (tester)\t', (target) => {
    target ? targetInfos.gram = target : targetInfos.gram = 'tester';
    whatsappTgt();
});



export {telegram, telegramTgt};