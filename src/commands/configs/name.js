/**
 * Script for name configuration
 */
//import {ask, userInfos} from "./parameters";
//import grams from "./telegram";
import {ask, userInfos} from "./parameters.js";
import {telegram} from "./telegram.js";

const uName = () => ask.question('\t User name : (test)\t', (target) => {
    target ? console.log(`Name is ${userInfos.name = target}`) : console.log(`Name is ${userInfos.name = 'test'}`);
    telegram();
});

export {uName};