// Add this to src/commands/defaults/status.js (create this file)
import {ask} from "../configs/parameters.js";
import {storage} from "../../storer/store.js";

/**
 * Show comprehensive status of the birthday mailer
 */
const showOverallStatus = () => {
    console.log('📊 Birthday Mailer - System Status\n');
    console.log('═══════════════════════════════════\n');

    // Check configuration status
    const userInfo = JSON.parse(storage.getItem('userInfos') || 'null');
    const targetInfo = JSON.parse(storage.getItem('targetInfos') || 'null');
    const targetDate = JSON.parse(storage.getItem('targetDate') || 'null');
    const targetMessage = JSON.parse(storage.getItem('targetMsg') || 'null');

    console.log('🔧 CONFIGURATION STATUS:');
    console.log(`   User Info:      ${userInfo ? '✅ Configured' : '❌ Not set'}`);
    console.log(`   Recipient Info: ${targetInfo ? '✅ Configured' : '❌ Not set'}`);
    console.log(`   Birthday Date:  ${targetDate ? '✅ Set' : '❌ Not set'}`);
    console.log(`   Message:        ${targetMessage ? '✅ Set' : '❌ Not set'}`);

    // Show details if configured
    if (userInfo) {
        console.log(`\n👤 YOUR INFORMATION:`);
        console.log(`   Name:     ${userInfo[0]}`);
        console.log(`   Email:    ${userInfo[3]}`);
    }

    if (targetInfo) {
        console.log(`\n🎯 RECIPIENT INFORMATION:`);
        console.log(`   Name:     ${targetInfo[0]}`);
        console.log(`   Email:    ${targetInfo[3]}`);
    }

    if (targetDate) {
        console.log(`\n🎂 BIRTHDAY INFORMATION:`);
        console.log(`   Date:     ${targetDate[1]}/${targetDate[0]} (MM/DD)`);

        // Calculate days until birthday
        const today = new Date();
        const currentYear = today.getFullYear();
        const birthdayThisYear = new Date(currentYear, parseInt(targetDate[1]) - 1, parseInt(targetDate[0]));

        // If birthday already passed this year, calculate for next year
        if (birthdayThisYear < today) {
            birthdayThisYear.setFullYear(currentYear + 1);
        }

        const daysUntil = Math.ceil((birthdayThisYear - today) / (1000 * 60 * 60 * 24));
        console.log(`   Days until: ${daysUntil} days`);
    }

    // Check email configuration
    console.log(`\n📧 EMAIL CONFIGURATION:`);
    const hasGmailUser = !!process.env.GMAIL_USER;
    const hasGmailPassword = !!process.env.GMAIL_APP_PASSWORD;

    console.log(`   Gmail User:     ${hasGmailUser ? '✅ Set' : '❌ Not set'}`);
    console.log(`   App Password:   ${hasGmailPassword ? '✅ Set' : '❌ Not set'}`);

    // Overall readiness
    const isReady = userInfo && targetInfo && targetDate && hasGmailUser && hasGmailPassword;

    console.log(`\n🚀 SYSTEM READINESS:`);
    console.log(`   Ready to send:  ${isReady ? '✅ YES' : '❌ NO'}`);

    if (!isReady) {
        console.log(`\n💡 TO GET READY:`);
        if (!userInfo) console.log(`   • Run: ./mailer.js config`);
        if (!targetInfo) console.log(`   • Run: ./mailer.js to`);
        if (!targetDate) console.log(`   • Run: ./mailer.js set date`);
        if (!hasGmailUser || !hasGmailPassword) console.log(`   • Set up .env file with Gmail credentials`);
    } else {
        console.log(`\n🎉 Everything is configured! You can:`);
        console.log(`   • Send now: ./mailer.js send`);
        console.log(`   • Start scheduler: ./mailer.js schedule start`);
        console.log(`   • Test email: ./mailer.js email test`);
    }

    console.log('\n');
    ask.close();
};

export {showOverallStatus};