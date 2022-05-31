import {createRequire} from 'module';

const require = createRequire(import.meta.url);
const readline = require('readline');
const editor = process.env.EDITOR;
/**
 * Container for parameters
 */

const [userInfos, targetInfos, targetDate, targetMsg] = [{}, {}, {}, {}];
/*const userInfos = {};
const targetInfos = {};*/
const ask = readline.createInterface(
    {
        input: process.stdin,
        output: process.stdout
    });

export {userInfos, ask, targetInfos, targetDate, targetMsg, require, editor};