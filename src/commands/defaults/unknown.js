/**
 * Method used to display unknown option
 * error
 */

import {ask} from "../configs/parameters.js";

const unknown = (args) => {
    console.log(`Unknown option : ${args}`,
        '\nUSAGE : bd_mailer [--help] [--info] [--status] [--version] \n',
        '<command> [<args>]\n')
    ask.close();
}

export {unknown};
