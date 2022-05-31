/*
* Script that is used to get the birthdate message
*
*/

import {editor, require} from "../parameters.js";
import * as child_process from "child_process";

const getMsg = () => {
    const child = child_process.spawn(editor, ['../src/storage/message'], {
        stdio: 'inherit'
    });
    child.on('exit', function (e, code) {
        console.log("finished");
    });

}
export {getMsg};