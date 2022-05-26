#!/usr/bin/node


/**
 * Script that store the data in the local storer of the machine
 */

import {userInfos} from "../commands/configs/parameters.js";
import {LocalStorage} from "node-localstorage";

const data = JSON.stringify(userInfos);
    const storage = new LocalStorage('./storage', {
        encoding: 'utf8',
        error: function (err) {
            console.log(err);
        }
    });
export {storage, data};
