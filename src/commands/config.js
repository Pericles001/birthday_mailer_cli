let user_infos = {};

/**
 * Method to configure user information
 */

const conf = () => {
    console.log("This walktrough will guide you through creating your personal information's details",
                '\n',
                'See bd_mailer help init for more documented about this command fields',
                '\n',
                "Press ^C to exit at anytime"
    );
    user_infos.name = prompt("\t User name : (test)\t")
    user_infos.gram = prompt("\t Telegram pseudo : (tester)\t")
    user_infos.gram = prompt("\t Whatsapp pseudo : (tester)\t")
    user_infos.email = prompt("\t Email address : (tester@gmail.com)\t")
}

module.exports = conf;