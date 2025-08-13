/**
 * Email command for sending emails using the email service.
 */

import emailBot from '../../bots/gmail/emailBot.js';
import {storage} from '../../storer/store.js';
import {ask} from '../configs/parameters.js';

/**
 * Send a birthday email manually
 */
const sendBirthdayEmail = async () => {
    try {
        console.log('🎉 Sending birthday email...\n');

        // Load stored data
        const userInfo = JSON.parse(storage.getItem('userInfos') || 'null');
        const targetInfo = JSON.parse(storage.getItem('targetInfos') || 'null');
        const targetMessage = JSON.parse(storage.getItem('targetMsg') || 'null');

        // Validate required data
        if (!userInfo) {
            console.log('❌ User information not configured. Run: ./mailer.js config');
            ask.close();
            return;
        }

        if (!targetInfo) {
            console.log('❌ Recipient information not configured. Run: ./mailer.js to');
            ask.close();
            return;
        }

        // Prepare data objects
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

        // Validate email addresses
        if (!recipientInfo.mail || !recipientInfo.mail.includes('@')) {
            console.log('❌ Invalid recipient email address');
            ask.close();
            return;
        }

        // Send the email
        const result = await emailBot.sendBirthdayEmail(recipientInfo, message, senderInfo);

        if (result.success) {
            console.log(`\n✅ Birthday email sent successfully to ${recipientInfo.name}!`);
            console.log(`📧 Email: ${recipientInfo.mail}`);
        }

    } catch (error) {
        console.error('\n❌ Failed to send birthday email:', error.message);

        if (error.message.includes('credentials')) {
            console.log('\n💡 Make sure to:');
            console.log('1. Create a .env file with your Gmail credentials');
            console.log('2. Use an App Password (not your regular Gmail password)');
            console.log('3. Enable 2-factor authentication on your Gmail account');
        }
    } finally {
        ask.close();
    }
};

/**
 * Test email configuration
 */
const testEmailConfig = async () => {
    try {
        console.log('🔧 Testing email configuration...\n');

        const success = await emailBot.testConnection();

        if (success) {
            console.log('\n✅ Email configuration is working correctly!');

            // Ask if user wants to send a test email
            ask.question('\nWould you like to send a test email to yourself? (y/n): ', async (answer) => {
                if (answer.toLowerCase() === 'y' || answer.toLowerCase() === 'yes') {
                    try {
                        await emailBot.sendTestEmail();
                        console.log('✅ Test email sent! Check your inbox.');
                    } catch (error) {
                        console.error('❌ Test email failed:', error.message);
                    }
                }
                ask.close();
            });
        } else {
            console.log('\n❌ Email configuration test failed');
            console.log('\n💡 Make sure to:');
            console.log('1. Create a .env file with GMAIL_USER and GMAIL_APP_PASSWORD');
            console.log('2. Use an App Password from Google Account settings');
            ask.close();
        }

    } catch (error) {
        console.error('❌ Test failed:', error.message);
        ask.close();
    }
};

/**
 * Show email configuration status
 */
const showEmailStatus = () => {
    console.log('📧 Email Configuration Status:\n');

    // Check environment variables
    const hasGmailUser = !!process.env.GMAIL_USER;
    const hasGmailPassword = !!process.env.GMAIL_APP_PASSWORD;

    console.log(`Gmail User: ${hasGmailUser ? '✅ Configured' : '❌ Not set'}`);
    console.log(`Gmail App Password: ${hasGmailPassword ? '✅ Configured' : '❌ Not set'}`);

    // Check stored data
    const userInfo = JSON.parse(storage.getItem('userInfos') || 'null');
    const targetInfo = JSON.parse(storage.getItem('targetInfos') || 'null');
    const targetMessage = JSON.parse(storage.getItem('targetMsg') || 'null');

    console.log(`\nStored Configuration:`);
    console.log(`User Info: ${userInfo ? '✅ Configured' : '❌ Not set'}`);
    console.log(`Recipient Info: ${targetInfo ? '✅ Configured' : '❌ Not set'}`);
    console.log(`Message: ${targetMessage ? '✅ Set' : '❌ Not set'}`);

    if (!hasGmailUser || !hasGmailPassword) {
        console.log('\n💡 To configure email:');
        console.log('1. Create/edit .env file in project root');
        console.log('2. Add GMAIL_USER=your-email@gmail.com');
        console.log('3. Add GMAIL_APP_PASSWORD=your-16-char-app-password');
        console.log('4. Get App Password from: https://myaccount.google.com/apppasswords');
    }

    ask.close();
};

export {sendBirthdayEmail, testEmailConfig, showEmailStatus};