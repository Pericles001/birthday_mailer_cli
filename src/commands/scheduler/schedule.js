// src/commands/scheduler/schedule.js
import birthdayScheduler from '../../scheduler/birthdayScheduler.js';
import {ask} from '../configs/parameters.js';
import {storage} from '../../storer/store.js';

/**
 * Start the birthday scheduler
 */
const startScheduler = () => {
    console.log('🚀 Starting Birthday Scheduler...\n');

    // Check if configuration is complete
    const userInfo = JSON.parse(storage.getItem('userInfos') || 'null');
    const targetInfo = JSON.parse(storage.getItem('targetInfos') || 'null');
    const targetDate = JSON.parse(storage.getItem('targetDate') || 'null');

    if (!userInfo || !targetInfo || !targetDate) {
        console.log('❌ Configuration incomplete! Please set up:');
        if (!userInfo) console.log('   • Your info: ./mailer.js config');
        if (!targetInfo) console.log('   • Recipient info: ./mailer.js to');
        if (!targetDate) console.log('   • Birthday date: ./mailer.js set date');
        ask.close();
        return;
    }

    const recipientName = targetInfo[0];
    const birthdayDate = `${targetDate[1]}/${targetDate[0]}`;

    console.log(`👤 Recipient: ${recipientName}`);
    console.log(`🎂 Birthday: ${birthdayDate}`);
    console.log('⏰ Schedule: Daily check at 9:00 AM\n');

    birthdayScheduler.start();
    ask.close();
};

/**
 * Stop the birthday scheduler
 */
const stopScheduler = () => {
    console.log('⏹️  Stopping Birthday Scheduler...\n');
    birthdayScheduler.stop();
    ask.close();
};

/**
 * Show scheduler status
 */
const showSchedulerStatus = () => {
    console.log('📊 Birthday Scheduler Status:\n');

    const status = birthdayScheduler.getStatus();
    console.log(`Status: ${status.isRunning ? '✅ Running' : '❌ Stopped'}`);
    console.log(`Next Check: ${status.nextRun}`);

    // Show configuration status
    const userInfo = JSON.parse(storage.getItem('userInfos') || 'null');
    const targetInfo = JSON.parse(storage.getItem('targetInfos') || 'null');
    const targetDate = JSON.parse(storage.getItem('targetDate') || 'null');

    console.log('\n📋 Configuration Status:');
    console.log(`User Info: ${userInfo ? '✅ Set' : '❌ Missing'}`);
    console.log(`Recipient Info: ${targetInfo ? '✅ Set' : '❌ Missing'}`);
    console.log(`Birthday Date: ${targetDate ? '✅ Set' : '❌ Missing'}`);

    if (targetInfo && targetDate) {
        console.log(`\n🎯 Monitoring: ${targetInfo[0]}'s birthday on ${targetDate[1]}/${targetDate[0]}`);
    }

    ask.close();
};

/**
 * Test birthday check (simulate today is the birthday)
 */
const testBirthdayCheck = () => {
    console.log('🧪 Testing birthday check...\n');

    ask.question('Do you want to test as if today is the birthday? (y/n): ', (answer) => {
        if (answer.toLowerCase() === 'y' || answer.toLowerCase() === 'yes') {
            // Temporarily modify the date to match today for testing
            const today = new Date();
            const currentDay = String(today.getDate()).padStart(2, '0');
            const currentMonth = String(today.getMonth() + 1).padStart(2, '0');

            console.log(`🔧 Simulating birthday check for today (${currentMonth}/${currentDay})...`);

            // Save original date
            const originalDate = storage.getItem('targetDate');

            // Set date to today for testing
            storage.setItem('targetDate', JSON.stringify([currentDay, currentMonth]));

            // Run the check
            birthdayScheduler.checkNow();

            // Restore original date
            if (originalDate) {
                storage.setItem('targetDate', originalDate);
            }

        } else {
            console.log('📅 Running normal birthday check...');
            birthdayScheduler.checkNow();
        }
        ask.close();
    });
};

/**
 * Show birthday logs
 */
const showBirthdayLogs = () => {
    console.log('📜 Birthday Email Logs:\n');

    const logs = birthdayScheduler.getLogs();

    if (logs.length === 0) {
        console.log('📭 No birthday emails sent yet.');
    } else {
        console.log('Recent birthday emails sent:');
        logs.slice(-10).forEach((log, index) => {
            console.log(`${index + 1}. ${log.name} (${log.email}) - ${log.date}`);
        });

        if (logs.length > 10) {
            console.log(`\n... and ${logs.length - 10} more entries.`);
        }
    }

    ask.close();
};

/**
 * Clear birthday logs
 */
const clearBirthdayLogs = () => {
    ask.question('Are you sure you want to clear all birthday logs? (y/n): ', (answer) => {
        if (answer.toLowerCase() === 'y' || answer.toLowerCase() === 'yes') {
            birthdayScheduler.clearLogs();
            console.log('✅ Birthday logs cleared successfully.');
        } else {
            console.log('❌ Operation cancelled.');
        }
        ask.close();
    });
};

export {
    startScheduler,
    stopScheduler,
    showSchedulerStatus,
    testBirthdayCheck,
    showBirthdayLogs,
    clearBirthdayLogs
};