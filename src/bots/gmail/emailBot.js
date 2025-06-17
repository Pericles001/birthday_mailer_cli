/**
 * Script used to contain the Gmail email bot
 */


import {createRequire} from 'module';
import dotenv from 'dotenv';

// Load environment variables
// Try multiple paths to find .env
import {fileURLToPath} from 'url';
import {dirname, join} from 'path';

const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);

// Load environment variables from project root
dotenv.config({path: join(__dirname, '../../../.env')});


// Also try loading from current directory as fallback
if (!process.env.GMAIL_USER) {
    dotenv.config();
}

const require = createRequire(import.meta.url);

class EmailBot {
    constructor() {
        this.transporter = null;
        this.isConfigured = false;
    }

    async initialize() {
        try {
            console.log('🔧 Loading nodemailer...');

            // Load nodemailer
            const nodemailer = require('nodemailer');
            console.log('Loaded via require');
            console.log('Nodemailer object keys:', Object.keys(nodemailer));

            // Use the CORRECT method name: createTransport (not createTransporter)
            if (typeof nodemailer.createTransport !== 'function') {
                throw new Error('createTransport method not found in nodemailer');
            }

            console.log('✅ Found createTransport method');

            // Check environment variables
            if (!process.env.GMAIL_USER || !process.env.GMAIL_APP_PASSWORD) {
                throw new Error('Gmail credentials not found in .env file');
            }

            console.log('🔧 Creating transporter...');
            console.log(`📧 Using email: ${process.env.GMAIL_USER}`);

            // Create transporter using the CORRECT method name
            this.transporter = nodemailer.createTransport({
                service: 'gmail',
                auth: {
                    user: process.env.GMAIL_USER,
                    pass: process.env.GMAIL_APP_PASSWORD
                }
            });

            console.log('🔍 Verifying connection...');
            await this.transporter.verify();
            this.isConfigured = true;
            console.log('✅ Gmail connection verified successfully');

            return true;
        } catch (error) {
            console.error('❌ Failed to initialize Gmail bot:', error.message);

            // Provide specific error guidance
            if (error.message.includes('Invalid login')) {
                console.log('\n💡 Authentication failed. Please check:');
                console.log('1. Your Gmail address is correct in .env');
                console.log('2. You are using an App Password (not regular password)');
                console.log('3. 2-Factor Authentication is enabled on your Gmail');
                console.log('4. App Password is 16 characters without spaces');
            }

            return false;
        }
    }

    async sendBirthdayEmail(recipientInfo, message, senderInfo) {
        if (!this.isConfigured) {
            const initialized = await this.initialize();
            if (!initialized) {
                throw new Error('Email bot not properly configured');
            }
        }

        try {
            console.log(`📧 Preparing email for ${recipientInfo.name}...`);

            // Prepare email content
            const htmlContent = this.generateBirthdayHTML(recipientInfo, message, senderInfo);
            const textContent = this.generateBirthdayText(recipientInfo, message, senderInfo);

            // Email options
            const mailOptions = {
                from: {
                    name: process.env.EMAIL_FROM_NAME || senderInfo.name || 'Birthday Reminder',
                    address: process.env.GMAIL_USER
                },
                to: recipientInfo.mail,
                subject: `${process.env.EMAIL_SUBJECT_PREFIX || '[Birthday Reminder]'} Happy Birthday, ${recipientInfo.name}! 🎉`,
                text: textContent,
                html: htmlContent
            };

            console.log(`📤 Sending email to ${recipientInfo.mail}...`);

            // Send email
            const info = await this.transporter.sendMail(mailOptions);

            console.log('✅ Birthday email sent successfully!');
            console.log(`📧 To: ${recipientInfo.mail}`);
            console.log(`📬 Message ID: ${info.messageId}`);

            return {
                success: true,
                messageId: info.messageId,
                recipient: recipientInfo.mail
            };

        } catch (error) {
            console.error('❌ Failed to send birthday email:', error.message);
            throw error;
        }
    }

    /**
     * Generate HTML email content
     */
    generateBirthdayHTML(recipientInfo, message, senderInfo) {
        const senderName = senderInfo.name || process.env.EMAIL_FROM_NAME || 'Your Friend';

        return `
        <!DOCTYPE html>
        <html>
        <head>
            <meta charset="utf-8">
            <style>
                body {
                    font-family: Arial, sans-serif;
                    max-width: 600px;
                    margin: 0 auto;
                    padding: 20px;
                    background-color: #f9f9f9;
                }
                .container {
                    background: white;
                    padding: 30px;
                    border-radius: 10px;
                    box-shadow: 0 2px 10px rgba(0,0,0,0.1);
                }
                .header {
                    text-align: center;
                    color: #d63384;
                    font-size: 28px;
                    margin-bottom: 20px;
                }
                .emoji {
                    font-size: 40px;
                    margin: 20px 0;
                }
                .message {
                    font-size: 16px;
                    line-height: 1.6;
                    color: #333;
                    margin: 20px 0;
                }
                .signature {
                    margin-top: 30px;
                    padding-top: 20px;
                    border-top: 1px solid #eee;
                    color: #666;
                    font-size: 14px;
                }
                .footer {
                    text-align: center;
                    margin-top: 20px;
                    color: #999;
                    font-size: 12px;
                }
            </style>
        </head>
        <body>
            <div class="container">
                <div class="header">
                    🎉 Happy Birthday, ${recipientInfo.name}! 🎉
                </div>
                
                <div class="emoji">🎂🎈🎁</div>
                
                <div class="message">
                    ${message ? message.replace(/\n/g, '<br>') : `
                        Wishing you a very happy birthday! 🎉<br><br>
                        May this special day bring you joy, happiness, and all the wonderful things you deserve.
                        I hope your birthday is filled with laughter, love, and amazing memories!<br><br>
                        Have a fantastic day! 🥳
                    `}
                </div>
                
                <div class="signature">
                    Best wishes,<br>
                    <strong>${senderName}</strong>
                </div>
                
                <div class="footer">
                    Sent with ❤️ using Birthday Mailer CLI
                </div>
            </div>
        </body>
        </html>
        `;
    }

    /**
     * Generate plain text email content
     */
    generateBirthdayText(recipientInfo, message, senderInfo) {
        const senderName = senderInfo.name || process.env.EMAIL_FROM_NAME || 'Your Friend';

        const defaultMessage = `
Wishing you a very happy birthday! 🎉

May this special day bring you joy, happiness, and all the wonderful things you deserve.
I hope your birthday is filled with laughter, love, and amazing memories!

Have a fantastic day! 🥳
        `.trim();

        return `
🎉 Happy Birthday, ${recipientInfo.name}! 🎉

${message || defaultMessage}

Best wishes,
${senderName}

---
Sent with ❤️ using Birthday Mailer CLI
        `.trim();
    }

    async testConnection() {
        return await this.initialize();
    }

    async sendTestEmail(testRecipient = process.env.GMAIL_USER) {
        const testRecipientInfo = {name: "Test User", mail: testRecipient};
        const testSenderInfo = {name: "Test Sender"};
        const testMessage = "This is a test from Birthday Mailer CLI!";

        return await this.sendBirthdayEmail(testRecipientInfo, testMessage, testSenderInfo);
    }
}

const emailBot = new EmailBot();
export default emailBot;
