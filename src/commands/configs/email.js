/**
 * Script for email configs
 */

import {ask, userInfos} from "./parameters.js";
import {storage, data} from "../../stocks/store.js";


const mail = () => ask.question('\t Email address : (tester@gmail.com)\t', (target) => {
    target ? console.log(`Pseudo is ${userInfos.mail = target}`) : console.log(`Pseudo is ${userInfos.mail = 'tester@gmail.com'}`);
    storage.setItem('userInfos', JSON.stringify(Object.values(userInfos)));
    ask.close();
    console.log(storage.getItem('userInfos'));

});

export {mail};