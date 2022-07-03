/**
 * Script that get target birthday
 */

import {ask, targetDate} from "../parameters.js";
import {storage} from "../../../storer/store.js";

const getMonth = () => ask.question('\t Month of birth: (03)\t', (target) => {
    target ? targetDate.month = target : targetDate.month = '01';
    storage.setItem('targetDate', JSON.stringify(Object.values(targetDate)));
    ask.close();
});

export {getMonth};
