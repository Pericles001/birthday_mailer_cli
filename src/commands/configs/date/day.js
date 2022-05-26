/**
 * Script that get target birthday
 */

import {ask, targetDate} from "../parameters.js";
import {getMonth} from "./month.js";

const getDay = () => ask.question('\t Day of birth: (03)\t', (target) => {
    target ? targetDate.day = target : targetDate.day = '01';
    getMonth();
});

export {getDay};