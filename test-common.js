import { createRequire } from 'module';

const require = createRequire(import.meta.url);

try {
    const nodemailer = require('nodemailer');
    console.log('✅ CommonJS import worked!');
    console.log('Type:', typeof nodemailer);
    console.log('createTransporter:', typeof nodemailer.createTransporter);
} catch (error) {
    console.log('❌ CommonJS import failed:', error.message);
}