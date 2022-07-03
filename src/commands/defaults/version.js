/**
 * Default version method of bd_mailer
 *
 * usage : display informations about version
 *
 * args : <v> <version> <-v> <-version>
 *         <--version>
 *
 */
import {ask} from "../configs/parameters.js";

const version = () => {
    console.log('\n',
        'bd_mailer version 1.0.0\n'
    );
    ask.close();
};

export {version};
