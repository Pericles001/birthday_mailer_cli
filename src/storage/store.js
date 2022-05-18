#!/usr/bin/node

/**
 * Script that store the data in the local storage of the machine
 */

import {userInfos} from "../commands/configs/parameters.js";

const store = () => {
    const data = JSON.stringify(userInfos);
    localStorage.setItem("userInfos", data);
};

export {store};