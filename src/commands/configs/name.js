/**
 * Script for name configuration
 */

import {ask, targetInfos, userInfos} from "./parameters.js";
import {telegram, telegramTgt} from "./telegram.js";

const uName = () => ask.question('\t User name : (test)\t', (target) => {
    target ? userInfos.name = target : userInfos.name = 'test';
    telegram();
});

const uNameTgt = () => ask.question('\t Target name : (test)\t', (target) => {
    target ? targetInfos.name = target : targetInfos.name = 'test';
    telegramTgt();
});


export {uName, uNameTgt};
