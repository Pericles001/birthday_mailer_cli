/**
 * Method used to display unknown option
 * error
 */

const unknown = (args) => {
    console.log(`Unknown option : ${args}`,
        '\nUSAGE : bd_mailer [--help] [--info] [--status] [--version] \n',
        '<command> [<args>]\n')
}
module.exports = unknown;