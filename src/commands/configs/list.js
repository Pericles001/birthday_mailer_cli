/**
 * Script that help list user and receiver information
 */
import {targetInfos, userInfos} from "./parameters.js";
import {storage} from "../../storer/store.js";

const [userTab, targetTab] = [JSON.parse(storage.getItem('userInfos')), JSON.parse(storage.getItem('targetInfos'))];


const userList = () => {


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
            {field: 'target.name', value: targetTab[0]},
            {field: 'target.telegram', value: targetTab[1]},
            {field: 'target.whatsapp', value: targetTab[2]},
            {field: 'target.email', value: targetTab[3]},
        ]
    );
}

export {userList, targetList};