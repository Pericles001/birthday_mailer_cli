import {mail, mailTgt} from "./email.js";
import {ask, userInfos, targetInfos} from "./parameters.js";

/**
 * Script for whatsapp credential configuration
 */

const whatsapp = () => ask.question('\t Whatsapp pseudo : (tester)\t', (target) => {
    target ? userInfos.what = target : userInfos.what = 'tester';
    mail();
});


const whatsappTgt = () => ask.question('\t Whatsapp pseudo : (tester)\t', (target) => {
    target ? targetInfos.what = target : targetInfos.what = 'tester';
    mailTgt();
});



export {whatsapp, whatsappTgt};