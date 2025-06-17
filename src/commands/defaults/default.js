import {info} from "./info.js";
import {help} from "./help.js";
import {version} from "./version.js";
import {unknown} from "./unknown.js";
import {showOverallStatus} from "./status.js";
import {conf, confTgt} from "../configs/config.js";
import {targetList, userList} from "../configs/list.js";
import {setDate, setMsg} from "../set/set.js";
import {ask, require} from "../configs/parameters.js";
import {readFile} from "../configs/msg/msg.js";
import {sendBirthdayEmail, showEmailStatus, testEmailConfig} from "../email/email.js";
import {
    clearBirthdayLogs,
    showBirthdayLogs,
    showSchedulerStatus,
    startScheduler,
    stopScheduler,
    testBirthdayCheck
} from "../scheduler/schedule.js";

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
    } else if (argv[2] === 'v' || argv[2] === '-v' || argv[2] === '-version' || argv[2] === '--version' || argv[2] === 'version') {
        version();
    } else if (argv[2] === 's' || argv[2] === '-s' || argv[2] === '-status' || argv[2] === '--status' || argv[2] === 'status') {
        showOverallStatus();
    } else if (argv[2] === 'config') {
        if (argv[3] === 'list' || argv[3] === 'l')
            userList();
        else
            conf();
    } else if (argv[2] === 'to') {
        if (argv[3] === 'list' || argv[3] === 'l')
            targetList();
        else if (argv[3] === 'msg')
            readFile('../src/storage/message').then(r => console.log("\n"));
        else
            confTgt()
    } else if (argv[2] === 'set') {
        if (argv[3] === 'msg')
            setMsg();
        else if (argv[3] === 'date')
            setDate();
        else
            ask.close();
    } else if (argv[2] === 'email') {
        if (argv[3] === 'send') {
            sendBirthdayEmail();
        } else if (argv[3] === 'test') {
            testEmailConfig();
        } else if (argv[3] === 'status') {
            showEmailStatus();
        } else {
            console.log('📧 Email commands:');
            console.log('  email send    - Send birthday email now');
            console.log('  email test    - Test email configuration');
            console.log('  email status  - Show email configuration status');
            console.log('\nExample: ./mailer.js email test');
            ask.close();
        }
    } else if (argv[2] === 'schedule') {
        if (argv[3] === 'start') {
            startScheduler();
        } else if (argv[3] === 'stop') {
            stopScheduler();
        } else if (argv[3] === 'status') {
            showSchedulerStatus();
        } else if (argv[3] === 'test') {
            testBirthdayCheck();
        } else if (argv[3] === 'logs') {
            showBirthdayLogs();
        } else if (argv[3] === 'clear') {
            clearBirthdayLogs();
        } else {
            console.log('📅 Schedule commands:');
            console.log('  schedule start   - Start automatic birthday checking');
            console.log('  schedule stop    - Stop the scheduler');
            console.log('  schedule status  - Show scheduler status');
            console.log('  schedule test    - Test birthday check');
            console.log('  schedule logs    - Show birthday email logs');
            console.log('  schedule clear   - Clear birthday logs');
            console.log('\nExample: ./mailer.js schedule start');
            ask.close();
        }
    } else if (argv[2] === 'send') {
        // Quick send command (shortcut for email send)
        sendBirthdayEmail();
    } else if (argv[2] === 'list') {
        // Show all configurations
        console.log('📋 All Configurations:\n');
        console.log('👤 Your Information:');
        userList();
        setTimeout(() => {
            console.log('\n🎯 Recipient Information:');
            targetList();
        }, 100);
    } else {
        unknown(argv[2]);
    }
};

export {def}