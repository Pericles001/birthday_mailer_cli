import {info} from "./info.js";
import {help} from "./help.js";
import {version} from "./version.js";
import {unknown} from "./unknown.js";
import {conf, confTgt} from "../configs/config.js";
import {targetList, userList} from "../configs/list.js";
import {setDate, setMsg} from "../set/set.js";
import {ask, require} from "../configs/parameters.js";
import {readFile} from "../configs/msg/msg.js";


/**
 * Default  method of bd_mailer
 *
 * usage : display native methods
 *          relative to bd_mailer
 * args : <h> <help> <i> <info>
 *         <s> <status> <v> <version>
 *
 */

const def = () => {
    const {argv} = require('process');

    if (argv[2] === undefined || argv[2] === 'help' || argv[2] === '--help') {
        help();
    } else if (argv[2] === 'i' || argv[2] === '-i' || argv[2] === '-info' || argv[2] === '--info' || argv[2] === 'info') {
        info();
    } else if (argv[2] === 'v' || argv[2] === '-v' || argv[2] === '-version' || argv[2] === '--version' || argv[2] === 'version') {
        version();
    } else if (argv[2] === 'config') {
        if (argv[3] === 'list' || argv[3] === 'l')
            userList();
        else
            conf();
    } else if (argv[2] === 'to') {
        if (argv[3] === 'list' || argv[3] === 'l')
            targetList();
        else if (argv[3] === 'msg')
            readFile('../src/storage/message').then(r => console.log("\n"));
        else
            confTgt()
    } else if (argv[2] === 'set') {
        if (argv[3] === 'msg')
            setMsg();
        else if (argv[3] === 'date')
            setDate();
        else
            ask.close();
    } else {
        unknown(argv[2]);
    }
};

export {def}
