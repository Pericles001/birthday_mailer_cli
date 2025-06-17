/**
 * Script that contains the birthday mailer daemon
 *
 */


import birthdayScheduler from '../scheduler/birthdayScheduler.js';
import {storage} from '../storer/store.js';

class BirthdayDaemon {
    constructor() {
        this.isRunning = false;
    }

    start() {
        console.log('🎉 Birthday Mailer Daemon Starting...\n');

        // Check configuration
        const userInfo = JSON.parse(storage.getItem('userInfos') || 'null');
        const targetInfo = JSON.parse(storage.getItem('targetInfos') || 'null');
        const targetDate = JSON.parse(storage.getItem('targetDate') || 'null');

        if (!userInfo || !targetInfo || !targetDate) {
            console.log('❌ Configuration incomplete! Please configure first.');
            console.log('💡 Run: ./mailer.js config && ./mailer.js to && ./mailer.js set date');
            process.exit(1);
        }

        console.log(`👤 Monitoring: ${targetInfo[0]}`);
        console.log(`🎂 Birthday: ${targetDate[1]}/${targetDate[0]}`);
        console.log('⏰ Schedule: Daily at 9:00 AM UTC\n');

        // Start the scheduler
        birthdayScheduler.start();
        this.isRunning = true;

        console.log('✅ Birthday Mailer Daemon is now running!');
        console.log('📋 The process will keep running until manually stopped.');
        console.log('💡 Press Ctrl+C to stop the daemon.\n');
        console.log('🔍 Logs will appear here when birthdays are detected...\n');

        // Handle graceful shutdown
        process.on('SIGINT', () => {
            console.log('\n🛑 Stopping Birthday Mailer Daemon...');
            birthdayScheduler.stop();
            console.log('✅ Daemon stopped gracefully.');
            process.exit(0);
        });

        process.on('SIGTERM', () => {
            console.log('\n🛑 Daemon terminated...');
            birthdayScheduler.stop();
            process.exit(0);
        });

        // Keep process alive
        setInterval(() => {
            // Optional: periodic status log (every hour)
            // console.log(`💓 Daemon alive at ${new Date().toLocaleString()}`);
        }, 3600000); // 1 hour
    }
}

const daemon = new BirthdayDaemon();
daemon.start();