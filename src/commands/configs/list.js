/**
 * Script that help list user and receiver information
 */
import {targetDate, targetInfos, userInfos} from "./parameters.js";
import {storage} from "../../storer/store.js";

const [userTab, targetTab, dateTab] = [JSON.parse(storage.getItem('userInfos')), JSON.parse(storage.getItem('targetInfos')), JSON.parse(storage.getItem('targetDate'))];


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
            {field: 'target.day', value: dateTab[0]},
            {field: 'target.month', value: dateTab[1]}
        ]
    );
}

export {userList, targetList};