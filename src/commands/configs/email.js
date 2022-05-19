/**
 * Script for email configs
 */

import {ask, userInfos} from "./parameters.js";
import {storage} from "../../storer/store.js";


const mail = () => ask.question('\t Email address : (tester@gmail.com)\t', (target) => {
    target ? userInfos.mail = target : userInfos.mail = 'tester@gmail.com';
    storage.setItem('userInfos', JSON.stringify(Object.values(userInfos)));
    ask.close();
    console.log(storage.getItem('userInfos'));

});

export {mail};