import {whatsapp} from "./whatsapp.js";
import {ask, userInfos} from "./parameters.js";

/**
 * Script for telegram configuration
 */

const telegram = () => ask.question('\t Telegram pseudo : (tester)\t', (target) => {
    target ? userInfos.gram = target : userInfos.gram = 'tester';
    whatsapp();
});

export {telegram};