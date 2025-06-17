/**
 * Schedule management commands for the birthday email scheduler
 */


import birthdayScheduler from '../../scheduler/birthdayScheduler.js';
import {ask} from '../configs/parameters.js';
import {storage} from '../../storer/store.js';
import {spawn} from 'child_process';

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
    console.log('⏰ Schedule: Daily check at 9:00 AM UTC\n');

    // Ask user for scheduler mode
    ask.question('Choose scheduler mode:\n1. Daemon Mode (recommended - runs independently)\n2. Session Mode (stops when terminal closes)\n\nEnter choice (1 or 2): ', (choice) => {
        if (choice === '1') {
            startDaemonMode();
        } else if (choice === '2') {
            startSessionMode();
        } else {
            console.log('❌ Invalid choice. Please enter 1 or 2.');
            ask.close();
        }
    });
};

/**
 * Start daemon mode (independent process)
 */
const startDaemonMode = () => {
    console.log('\n🚀 Starting in Daemon Mode...\n');

    try {
        // Spawn daemon process
        const daemon = spawn('node', ['daemon/birthdayDaemon.js'], {
            cwd: process.cwd(),
            detached: true,
            stdio: ['ignore', 'pipe', 'pipe']
        });

        // Save daemon PID for later reference
        const daemonInfo = {
            pid: daemon.pid,
            startTime: new Date().toISOString(),
            mode: 'daemon'
        };
        storage.setItem('daemonInfo', JSON.stringify(daemonInfo));

        console.log('✅ Birthday Mailer Daemon started successfully!');
        console.log(`🆔 Process ID: ${daemon.pid}`);
        console.log('📋 The daemon is now running independently.');
        console.log('💡 It will continue running even if you close this terminal.\n');

        console.log('📋 USEFUL COMMANDS:');
        console.log('• ./mailer.js schedule status  - Check daemon status');
        console.log('• ./mailer.js schedule stop    - Stop the daemon');
        console.log('• ./mailer.js schedule logs    - View email history\n');

        // Let daemon run independently
        daemon.unref();

        ask.close();

    } catch (error) {
        console.error('❌ Failed to start daemon:', error.message);
        console.log('💡 Falling back to session mode...');
        startSessionMode();
    }
};

/**
 * Start session mode (attached to current terminal)
 */
const startSessionMode = () => {
    console.log('\n🚀 Starting in Session Mode...\n');
    console.log('⚠️  Warning: Scheduler will stop when you close this terminal.\n');

    const started = birthdayScheduler.start();

    if (started) {
        console.log('🎯 SCHEDULER STATUS:');
        console.log('• Scheduler is active in this session');
        console.log('• Keep this terminal open for continuous operation');
        console.log('• Press Ctrl+C to stop\n');

        // Mark as session mode
        const sessionInfo = {
            mode: 'session',
            startTime: new Date().toISOString()
        };
        storage.setItem('daemonInfo', JSON.stringify(sessionInfo));

        // Don't close - keep running
        console.log('💡 Scheduler is running... (Press Ctrl+C to stop)');

        // Handle graceful shutdown
        process.on('SIGINT', () => {
            console.log('\n🛑 Stopping scheduler...');
            birthdayScheduler.stop();
            console.log('✅ Scheduler stopped.');
            process.exit(0);
        });

        // Keep process alive - don't call ask.close()

    } else {
        ask.close();
    }
};

/**
 * Stop the birthday scheduler
 */
const stopScheduler = () => {
    console.log('⏹️  Stopping Birthday Scheduler...\n');

    const daemonInfo = JSON.parse(storage.getItem('daemonInfo') || 'null');

    if (daemonInfo && daemonInfo.mode === 'daemon' && daemonInfo.pid) {
        // Try to stop daemon process
        try {
            process.kill(daemonInfo.pid, 'SIGTERM');
            console.log('✅ Daemon process stopped successfully.');

            // Clear daemon info
            storage.removeItem('daemonInfo');

        } catch (error) {
            console.log('⚠️  Could not stop daemon process (may already be stopped).');
            console.log('💡 If daemon is still running, use system commands to stop it.');
        }
    } else {
        // Try to stop session scheduler
        const stopped = birthdayScheduler.stop();
        if (stopped) {
            console.log('✅ Session scheduler stopped successfully.');
        } else {
            console.log('⚠️  No active scheduler found.');
        }
    }

    ask.close();
};

/**
 * Show scheduler status
 */
const showSchedulerStatus = () => {
    console.log('📊 Birthday Scheduler Status:\n');

    const daemonInfo = JSON.parse(storage.getItem('daemonInfo') || 'null');
    const status = birthdayScheduler.getStatus();

    if (daemonInfo) {
        console.log(`Mode: ${daemonInfo.mode === 'daemon' ? '🤖 Daemon' : '💻 Session'}`);

        if (daemonInfo.mode === 'daemon') {
            console.log(`Process ID: ${daemonInfo.pid || 'Unknown'}`);
            console.log(`Started: ${new Date(daemonInfo.startTime).toLocaleString()}`);

            // Check if daemon process is still running
            try {
                process.kill(daemonInfo.pid, 0); // Signal 0 just checks if process exists
                console.log('Status: ✅ Daemon Running');
            } catch (error) {
                console.log('Status: ❌ Daemon Stopped (process not found)');
            }
        } else {
            console.log(`Started: ${new Date(daemonInfo.startTime).toLocaleString()}`);
            console.log(`Status: ${status.isRunning ? '✅ Session Running' : '❌ Session Stopped'}`);
        }
    } else {
        console.log('Status: ❌ No scheduler running');
    }

    console.log(`Next Check: ${status.isRunning ? 'Daily at 9:00 AM UTC' : 'Not scheduled'}`);

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

            console.log('📧 This will send a REAL email if today matches the birthday!');

            // Run the check
            birthdayScheduler.checkNow();

            // Restore original date after a delay
            setTimeout(() => {
                if (originalDate) {
                    storage.setItem('targetDate', originalDate);
                    console.log('🔄 Original birthday date restored.');
                }
                ask.close();
            }, 3000);

        } else {
            console.log('📅 Running normal birthday check...');
            birthdayScheduler.checkNow();
            ask.close();
        }
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
        console.log('💡 Logs will appear here after emails are sent automatically or manually.');
    } else {
        console.log('Recent birthday emails sent:');
        logs.slice(-10).reverse().forEach((log, index) => {
            const date = new Date(log.timestamp).toLocaleString();
            console.log(`${index + 1}. ${log.name} (${log.email}) - ${date}`);
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
