import {mail} from "./email.js";
import {ask, userInfos} from "./parameters.js";

/**
 * Script for whatsapp credential configuration
 */

const whatsapp = () => ask.question('\t Whatsapp pseudo : (tester)\t', (target) => {
    target ? userInfos.what = target : userInfos.what = 'tester';
    mail();
});

export {whatsapp};