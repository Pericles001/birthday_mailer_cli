import {uName} from "./name.js";

/**
 * Method to configure user information
 */

const conf = () => {
    console.log("This walk-trough will guide you through creating your personal information's details",
        '\n',
        '\nSee bd_mailer help init for more documented about this command fields',
        '\n',
        '\nPress ^C to exit at anytime'
    );
    uName();
};

export {conf};