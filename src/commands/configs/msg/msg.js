/*
* Script that is used to get the birthdate message
*
*/

import {editor, require, targetInfos, targetMsg} from "../parameters.js";
import * as child_process from "child_process";
import {storage} from "../../../storer/store.js";

const fs = require('fs').promises;

async function readFile(filePath) {
    try {
        const data = await fs.readFile(filePath);
        console.log(data.toString());
    } catch (error) {
        console.error(`Got an error trying to read the file: ${error.message}`);
    }
}

async function saveMsg(filePath) {
    try {
        const data = await fs.readFile(filePath);
         targetMsg.content = data.toString();
        storage.setItem('targetMsg', JSON.stringify(Object.values(targetMsg)));
    } catch (error) {
        console.error(`Got an error trying to save the file: ${error.message}`);
    }
}


const getMsg = () => {
    const child = child_process.spawn(editor, ['../src/storage/message'], {
        stdio: 'inherit'
    });
    child.on('exit', function (e, code) {

        saveMsg('../src/storage/message').then(r => console.log("Finished"));
    });

}








export {getMsg, readFile};