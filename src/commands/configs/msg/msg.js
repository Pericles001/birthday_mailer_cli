/*
* Script that is used to get the birthdate message
*
*/

import {targetMsg} from "../parameters.js";
const {exec} = require('child_process');

const getMsg = () => {
    exec('nano msg', (error, stdout, stderr)=> {
        if (error) {
            console.error(`error: ${error.message}`);
            return;
        }

        if (stderr) {
            console.error(`stderr: ${stderr}`);
            return;
        }
    })
}

export {getMsg};