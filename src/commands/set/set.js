/**
 * Script that is used to set the target msg and date
 */
import {getDate} from "../configs/date.js";

const setDate = () => {
    console.log("This walk-trough will guide you through adding  birthdate ",
        '\n',
        '\nSee bd_mailer help init for more documented about this command fields',
        '\n',
        '\nPress ^C to exit at anytime'
    );
    getDate();
};

const setMsg = () => {
    console.log("This walk-trough will guide you through adding  personal message  ",
        '\n',
        '\nSee bd_mailer help init for more documented about this command fields',
        '\n',
        '\nPress ^C to exit at anytime'
    );
};

export {setDate, setMsg}

