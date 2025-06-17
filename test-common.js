// Test different import methods
console.log('Testing nodemailer imports...');

try {
    // Method 1: ES6 import
    import nodemailer from 'nodemailer';
    console.log('✅ ES6 import worked:', typeof nodemailer);
    console.log('createTransporter:', typeof nodemailer.createTransporter);
} catch (error) {
    console.log('❌ ES6 import failed:', error.message);
}

try {
    // Method 2: Namespace import
    import * as nodemailer2 from 'nodemailer';
    console.log('✅ Namespace import worked:', typeof nodemailer2);
    console.log('createTransporter:', typeof nodemailer2.createTransporter);
} catch (error) {
    console.log('❌ Namespace import failed:', error.message);
}

try {
    // Method 3: CommonJS style
    import { createRequire } from 'module';
    const require = createRequire(import.meta.url);
    const nodemailer3 = require('nodemailer');
    console.log('✅ CommonJS import worked:', typeof nodemailer3);
    console.log('createTransporter:', typeof nodemailer3.createTransporter);
} catch (error) {
    console.log('❌ CommonJS import failed:', error.message);
}