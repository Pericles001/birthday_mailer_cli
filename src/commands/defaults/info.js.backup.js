/**
 * Default information method of bd_mailer
 *
 * usage : display informations about program
 *
 * args : <i> <info> <-i> <-info>
 *         <--info>
 *
 */
import {ask} from "../configs/parameters.js";

const info = () => {
    console.log('\n',
        'Birthday mailer made by Pericles001 is a simple messaging tool\n',
        'for people who like terminal\n',
        '\nPURPOSE: Automation of birthday messages\n',
        '\t canals \t Gmail , telegram, whatsapp and simple sms\n',
        '\n',
        'This tool is expecting comments and advices from you to build\n',
        'a strong community and develop much features\n',
        '\n',
        'Have a look at our features!\n'
    );
    ask.close();
};

export {info};
