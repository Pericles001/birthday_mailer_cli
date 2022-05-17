/**
 * Default version method of bd_mailer
 *
 * usage : display informations about version
 *
 * args : <v> <version> <-v> <-version>
 *         <--version>
 *
 */

const version = () => {
    console.log('\n',
        'bd_mailer version 1.0.0\n'
    );
};

export {version};