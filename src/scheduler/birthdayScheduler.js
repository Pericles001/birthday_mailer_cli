/**
 * Script to manage birthday email scheduling
 *
 */


import cron from 'node-cron';
import {storage} from '../storer/store.js';
import emailBot from '../bots/gmail/emailBot.js';

class BirthdayScheduler {
    constructor() {
        this.isRunning = false;
        this.cronJob = null;
    }

    /**
     * Check if today matches any birthday
     */
    checkBirthdays() {
        const today = new Date();
        const currentDay = String(today.getDate()).padStart(2, '0');
        const currentMonth = String(today.getMonth() + 1).padStart(2, '0');

        console.log(`🗓️  Checking birthdays for ${currentMonth}/${currentDay}...`);

        // Load stored data
        const userInfo = JSON.parse(storage.getItem('userInfos') || 'null');
        const targetInfo = JSON.parse(storage.getItem('targetInfos') || 'null');
        const targetDate = JSON.parse(storage.getItem('targetDate') || 'null');
        const targetMessage = JSON.parse(storage.getItem('targetMsg') || 'null');

        // Check if we have all required data
        if (!userInfo || !targetInfo || !targetDate) {
            console.log('⚠️  Incomplete configuration. Skipping birthday check.');
            return;
        }

        // Check if today matches the birthday
        const birthdayDay = String(targetDate[0]).padStart(2, '0');
        const birthdayMonth = String(targetDate[1]).padStart(2, '0');

        if (currentDay === birthdayDay && currentMonth === birthdayMonth) {
            console.log(`🎉 IT'S ${targetInfo[0]}'S BIRTHDAY TODAY!`);
            this.sendBirthdayEmail(userInfo, targetInfo, targetMessage);
        } else {
            console.log(`📅 No birthdays today. Next check tomorrow.`);
        }
    }

    /**
     * Send birthday email automatically
     */
    async sendBirthdayEmail(userInfo, targetInfo, targetMessage) {
        try {
            console.log(`📧 Sending automatic birthday email to ${targetInfo[0]}...`);

            const senderInfo = {
                name: userInfo[0],
                telegram: userInfo[1],
                whatsapp: userInfo[2],
                mail: userInfo[3]
            };

            const recipientInfo = {
                name: targetInfo[0],
                telegram: targetInfo[1],
                whatsapp: targetInfo[2],
                mail: targetInfo[3]
            };

            const message = targetMessage ? targetMessage[0] : null;

            const result = await emailBot.sendBirthdayEmail(recipientInfo, message, senderInfo);

            if (result.success) {
                console.log(`✅ Automatic birthday email sent successfully to ${recipientInfo.name}!`);
                console.log(`📧 Email: ${recipientInfo.mail}`);

                // Log the successful send
                this.logBirthdaySent(recipientInfo.name, recipientInfo.mail);
            }

        } catch (error) {
            console.error('❌ Failed to send automatic birthday email:', error.message);
        }
    }

    /**
     * Log when birthday email was sent
     */
    logBirthdaySent(name, email) {
        const today = new Date().toISOString().split('T')[0];
        const logEntry = {
            name: name,
            email: email,
            date: today,
            timestamp: new Date().toISOString()
        };

        // Save to localStorage
        const existingLogs = JSON.parse(storage.getItem('birthdayLogs') || '[]');
        existingLogs.push(logEntry);
        storage.setItem('birthdayLogs', JSON.stringify(existingLogs));

        // Also save scheduler state
        this.saveSchedulerState();
    }

    /**
     * Save scheduler state to storage
     */
    saveSchedulerState() {
        const state = {
            isRunning: this.isRunning,
            startTime: this.isRunning ? new Date().toISOString() : null,
            lastCheck: new Date().toISOString()
        };
        storage.setItem('schedulerState', JSON.stringify(state));
    }

    /**
     * Load scheduler state from storage
     */
    loadSchedulerState() {
        const state = JSON.parse(storage.getItem('schedulerState') || 'null');
        return state;
    }

    /**
     * Start the scheduler (runs daily at 9:00 AM)
     */
    start() {
        if (this.isRunning) {
            console.log('⚠️  Scheduler is already running!');
            return false;
        }

        try {
            // Schedule to run every day at 9:00 AM
            this.cronJob = cron.schedule('0 9 * * *', () => {
                console.log('🔔 Daily birthday check triggered...');
                this.checkBirthdays();
            }, {
                scheduled: false,
                timezone: "UTC"
            });

            this.cronJob.start();
            this.isRunning = true;

            console.log('✅ Birthday scheduler started! Will check daily at 9:00 AM UTC.');
            console.log('🔍 Running initial check now...');

            // Save state
            this.saveSchedulerState();

            // Run an immediate check
            this.checkBirthdays();

            console.log('\n💡 Scheduler is now running in the background.');
            console.log('💡 Use "schedule status" to check if it\'s running.');
            console.log('💡 Use "schedule stop" to stop the scheduler.');

            return true;

        } catch (error) {
            console.error('❌ Failed to start scheduler:', error.message);
            return false;
        }
    }

    /**
     * Stop the scheduler
     */
    stop() {
        if (this.cronJob) {
            this.cronJob.stop();
            this.cronJob.destroy();
            this.cronJob = null;
            this.isRunning = false;

            // Update state
            this.saveSchedulerState();

            console.log('⏹️  Birthday scheduler stopped.');
            return true;
        } else {
            console.log('⚠️  No scheduler is currently running.');
            return false;
        }
    }

    /**
     * Get scheduler status
     */
    getStatus() {
        const savedState = this.loadSchedulerState();

        return {
            isRunning: this.isRunning,
            cronJobActive: this.cronJob ? true : false,
            nextRun: this.isRunning ? 'Daily at 9:00 AM UTC' : 'Not scheduled',
            savedState: savedState
        };
    }

    /**
     * Check birthday manually (for testing)
     */
    checkNow() {
        console.log('🔍 Manual birthday check triggered...');
        this.checkBirthdays();
    }

    /**
     * Get birthday logs
     */
    getLogs() {
        const logs = JSON.parse(storage.getItem('birthdayLogs') || '[]');
        return logs;
    }

    /**
     * Clear birthday logs
     */
    clearLogs() {
        storage.setItem('birthdayLogs', JSON.stringify([]));
        console.log('🗑️  Birthday logs cleared.');
    }

    /**
     * Check if scheduler should be running (for status check)
     */
    checkSavedState() {
        const savedState = this.loadSchedulerState();
        if (savedState && savedState.isRunning && !this.isRunning) {
            console.log('⚠️  Scheduler was running but is not active in this session.');
            console.log('💡 Run "schedule start" to restart it.');
        }
    }
}

// Export singleton instance
const birthdayScheduler = new BirthdayScheduler();
export default birthdayScheduler;


// // src/scheduler/birthdayScheduler.js
// import cron from 'node-cron';
// import {storage} from '../storer/store.js';
// import emailBot from '../bots/gmail/emailBot.js';
//
// class BirthdayScheduler {
//     constructor() {
//         this.isRunning = false;
//         this.cronJob = null;
//     }
//
//     /**
//      * Check if today matches any birthday
//      */
//     checkBirthdays() {
//         const today = new Date();
//         const currentDay = String(today.getDate()).padStart(2, '0');
//         const currentMonth = String(today.getMonth() + 1).padStart(2, '0');
//
//         console.log(`🗓️  Checking birthdays for ${currentMonth}/${currentDay}...`);
//
//         // Load stored data
//         const userInfo = JSON.parse(storage.getItem('userInfos') || 'null');
//         const targetInfo = JSON.parse(storage.getItem('targetInfos') || 'null');
//         const targetDate = JSON.parse(storage.getItem('targetDate') || 'null');
//         const targetMessage = JSON.parse(storage.getItem('targetMsg') || 'null');
//
//         // Check if we have all required data
//         if (!userInfo || !targetInfo || !targetDate) {
//             console.log('⚠️  Incomplete configuration. Skipping birthday check.');
//             return;
//         }
//
//         // Check if today matches the birthday
//         const birthdayDay = String(targetDate[0]).padStart(2, '0');
//         const birthdayMonth = String(targetDate[1]).padStart(2, '0');
//
//         if (currentDay === birthdayDay && currentMonth === birthdayMonth) {
//             console.log(`🎉 IT'S ${targetInfo[0]}'S BIRTHDAY TODAY!`);
//             this.sendBirthdayEmail(userInfo, targetInfo, targetMessage);
//         } else {
//             console.log(`📅 No birthdays today. Next check tomorrow.`);
//         }
//     }
//
//     /**
//      * Send birthday email automatically
//      */
//     async sendBirthdayEmail(userInfo, targetInfo, targetMessage) {
//         try {
//             console.log(`📧 Sending automatic birthday email to ${targetInfo[0]}...`);
//
//             const senderInfo = {
//                 name: userInfo[0],
//                 telegram: userInfo[1],
//                 whatsapp: userInfo[2],
//                 mail: userInfo[3]
//             };
//
//             const recipientInfo = {
//                 name: targetInfo[0],
//                 telegram: targetInfo[1],
//                 whatsapp: targetInfo[2],
//                 mail: targetInfo[3]
//             };
//
//             const message = targetMessage ? targetMessage[0] : null;
//
//             const result = await emailBot.sendBirthdayEmail(recipientInfo, message, senderInfo);
//
//             if (result.success) {
//                 console.log(`✅ Automatic birthday email sent successfully to ${recipientInfo.name}!`);
//                 console.log(`📧 Email: ${recipientInfo.mail}`);
//
//                 // Log the successful send
//                 this.logBirthdaySent(recipientInfo.name, recipientInfo.mail);
//             }
//
//         } catch (error) {
//             console.error('❌ Failed to send automatic birthday email:', error.message);
//         }
//     }
//
//     /**
//      * Log when birthday email was sent
//      */
//     logBirthdaySent(name, email) {
//         const today = new Date().toISOString().split('T')[0];
//         const logEntry = {
//             name: name,
//             email: email,
//             date: today,
//             timestamp: new Date().toISOString()
//         };
//
//         // Save to localStorage (you could also save to a file)
//         const existingLogs = JSON.parse(storage.getItem('birthdayLogs') || '[]');
//         existingLogs.push(logEntry);
//         storage.setItem('birthdayLogs', JSON.stringify(existingLogs));
//     }
//
//     /**
//      * Start the scheduler (runs daily at 9:00 AM)
//      */
//     start() {
//         if (this.isRunning) {
//             console.log('⚠️  Scheduler is already running!');
//             return;
//         }
//
//         // Schedule to run every day at 9:00 AM
//         this.cronJob = cron.schedule('0 9 * * *', () => {
//             console.log('🔔 Daily birthday check triggered...');
//             this.checkBirthdays();
//         }, {
//             scheduled: false,
//             timezone: "UTC"  // You can change this to your timezone
//         });
//
//         this.cronJob.start();
//         this.isRunning = true;
//
//         console.log('✅ Birthday scheduler started! Will check daily at 9:00 AM.');
//         console.log('🔍 Running initial check now...');
//
//         // Run an immediate check
//         this.checkBirthdays();
//     }
//
//     /**
//      * Stop the scheduler
//      */
//     stop() {
//         if (this.cronJob) {
//             this.cronJob.stop();
//             this.isRunning = false;
//             console.log('⏹️  Birthday scheduler stopped.');
//         } else {
//             console.log('⚠️  No scheduler is currently running.');
//         }
//     }
//
//     /**
//      * Get scheduler status
//      */
//     getStatus() {
//         return {
//             isRunning: this.isRunning,
//             nextRun: this.cronJob ? 'Daily at 9:00 AM' : 'Not scheduled'
//         };
//     }
//
//     /**
//      * Check birthday manually (for testing)
//      */
//     checkNow() {
//         console.log('🔍 Manual birthday check triggered...');
//         this.checkBirthdays();
//     }
//
//     /**
//      * Get birthday logs
//      */
//     getLogs() {
//         const logs = JSON.parse(storage.getItem('birthdayLogs') || '[]');
//         return logs;
//     }
//
//     /**
//      * Clear birthday logs
//      */
//     clearLogs() {
//         storage.setItem('birthdayLogs', JSON.stringify([]));
//         console.log('🗑️  Birthday logs cleared.');
//     }
// }
//
// // Export singleton instance
// const birthdayScheduler = new BirthdayScheduler();
// export default birthdayScheduler;