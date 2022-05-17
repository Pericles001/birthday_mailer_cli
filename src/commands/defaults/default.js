import {info} from "./info.js";
import {help} from "./help.js";
import {version} from "./version.js";
import {unknown} from "./unknown.js";
import {conf} from "../configs/config.js";
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
    } else if (argv[2] === 'v' || argv[2] === '-v' || argv[2] === '-version'|| argv[2] === '--version'|| argv[2] === 'version'){
        version();
    } else if (argv[2] === 'config'){
        conf();
    }
    else {
        unknown(argv[2]);
    }
};

export {def}
