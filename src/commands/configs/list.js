/**
 * Script that help list user and receiver information
 */
import {targetInfos, userInfos} from "./parameters.js";
import {storage} from "../../storer/store.js";

const userList = () => {

    const userTab = JSON.parse(storage.getItem('userInfos'));
    console.table(
        [
            {field: 'user.name', value: userTab[0]},
            {field: 'user.telegram', value: userTab[1]},
            {field: 'user.whatsapp', value: userTab[2]},
            {field: 'user.email', value: userTab[3]},
        ]
    );
}

const targetList = () => {
    console.table(
        [
            {field: 'target.name', value: targetInfos.name},
            {field: 'target.email', value: targetInfos.mail},
            {field: 'target.telegram', value: targetInfos.gram},
            {field: 'target.whatsapp', value: targetInfos.what}
        ]
    );
}

export {userList, targetList};