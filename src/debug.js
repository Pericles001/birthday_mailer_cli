// Create this as debug.js in your src directory to check what's saved

import {LocalStorage} from "node-localstorage";

const storage = new LocalStorage('./storage', {
    encoding: 'utf8',
    error: function (err) {
        console.log(err);
    }
});

console.log("=== Checking stored data ===");
console.log("User Info:", storage.getItem('userInfos'));
console.log("Target Info:", storage.getItem('targetInfos'));
console.log("Target Date:", storage.getItem('targetDate'));
console.log("Target Message:", storage.getItem('targetMsg'));
console.log("=== End data ===");