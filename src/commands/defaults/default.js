const infos = require('./info');
const helps = require('./help');
const versions = require('./version');
const unknowns = require('./unknown');
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
        helps();
    } else if (argv[2] === 'i' || argv[2] === '-i' || argv[2] === '-info' || argv[2] === '--info' || argv[2] === 'info') {
        infos();
    } else if (argv[2] === 'v' || argv[2] === '-v' || argv[2] === '-version'|| argv[2] === '--version'|| argv[2] === 'version'){
        versions();
    }
    else {
        unknowns(argv[2]);
    }
};

module.exports = def;
