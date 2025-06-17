/**
 * Script for email bot
 */

import nodemailer from 'nodemailer';
import dotenv from 'dotenv';
import { fileURLToPath } from 'url';
import { dirname, join } from 'path';

// Load environment variables
const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);
const envPath = join(__dirname, '../../../.env');
dotenv.config({ path: envPath });


class EmailBot {
    constructor() {
        this.transporter = null;
        this.isConfigured = false;
    }

    /**
     * Initialize the email transporter
     */
    async initialize() {
        try {
            // Check if required environment variables are set
            if (!process.env.GMAIL_USER || !process.env.GMAIL_APP_PASSWORD) {
                throw new Error('Gmail credentials not found in .env file');
            }

            // Create transporter
            this.transporter = nodemailer.createTransporter({
                service: 'gmail',
                auth: {
                    user: process.env.GMAIL_USER,
                    pass: process.env.GMAIL_APP_PASSWORD
                }
            });

            // Verify connection
            await this.transporter.verify();
            this.isConfigured = true;
            console.log('✅ Gmail connection verified successfully');

            return true;
        } catch (error) {
            console.error('❌ Failed to initialize Gmail bot:', error.message);
            return false;
        }
    }

    /**
     * Send a birthday email
     */
    async sendBirthdayEmail(recipientInfo, message, senderInfo) {
        if (!this.isConfigured) {
            const initialized = await this.initialize();
            if (!initialized) {
                throw new Error('Email bot not properly configured');
            }
        }

        try {
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
                    <strong>${senderInfo.name || 'Your Friend'}</strong>
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
${senderInfo.name || 'Your Friend'}

---
Sent with ❤️ using Birthday Mailer CLI
        `.trim();
    }

    /**
     * Test email configuration
     */
    async testConnection() {
        try {
            const initialized = await this.initialize();
            if (initialized) {
                console.log('✅ Email configuration test passed!');
                return true;
            }
            return false;
        } catch (error) {
            console.error('❌ Email configuration test failed:', error.message);
            return false;
        }
    }

    /**
     * Send a test email
     */
    async sendTestEmail(testRecipient = process.env.GMAIL_USER) {
        try {
            const testMessage = "This is a test message from your Birthday Mailer CLI! 🎉";
            const testRecipientInfo = {
                name: "Test User",
                mail: testRecipient
            };
            const testSenderInfo = {
                name: "Birthday Mailer Test"
            };

            const result = await this.sendBirthdayEmail(testRecipientInfo, testMessage, testSenderInfo);
            console.log('✅ Test email sent successfully!');
            return result;
        } catch (error) {
            console.error('❌ Test email failed:', error.message);
            throw error;
        }
    }
}

// Export singleton instance
const emailBot = new EmailBot();
export default emailBot;