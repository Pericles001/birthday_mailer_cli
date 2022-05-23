import {createRequire} from 'module';

const require = createRequire(import.meta.url);
const readline = require('readline');
/**
 * Container for parameters
 */

const userInfos = {};
const targetInfos = {};
const ask = readline.createInterface(
    {
        input: process.stdin,
        output: process.stdout
    });

export {userInfos, ask, targetInfos};