/**
 * Default information method of bd_mailer
 *
 * usage : display informations about program
 *
 * args : <i> <info> <-i> <-info>
 *         <--info>
 *
 */
import {ask} from "../configs/parameters.js";

const info = () => {
    console.log('\n',
        '🎉 Birthday Mailer CLI - Made by Pericles001\n',
        '═══════════════════════════════════════════\n',
        '\n',
        '📧 A powerful command-line tool for automating birthday messages\n',
        'Perfect for developers and terminal enthusiasts!\n',
        '\n',
        '🎯 PURPOSE: Automated Birthday Message Delivery\n',
        '\n',
        '📬 SUPPORTED CHANNELS:\n',
        '\t ✅ Gmail (Fully Implemented)\n',
        '\t 🚧 Telegram (Planned)\n',
        '\t 🚧 WhatsApp (Planned)\n',
        '\t 🚧 SMS (Planned)\n',
        '\n',
        '⚡ CURRENT FEATURES:\n',
        '\t • Interactive CLI configuration\n',
        '\t • Gmail integration with HTML templates\n',
        '\t • Personalized birthday messages\n',
        '\t • Email configuration testing\n',
        '\t • Secure App Password authentication\n',
        '\t • Cross-platform support (Linux/WSL)\n',
        '\n',
        '🔐 EMAIL SETUP REQUIREMENTS:\n',
        '\t 1. Gmail account with 2-Factor Authentication enabled\n',
        '\t 2. Gmail App Password (NOT your regular password)\n',
        '\t 3. .env file with credentials\n',
        '\n',
        '📝 QUICK SETUP:\n',
        '\t 1. ./mailer.js config         # Configure your info\n',
        '\t 2. ./mailer.js to             # Configure recipient\n',
        '\t 3. ./mailer.js set msg        # Set birthday message\n',
        '\t 4. ./mailer.js email test     # Test email config\n',
        '\t 5. ./mailer.js send           # Send birthday email!\n',
        '\n',
        '🔑 GET GMAIL APP PASSWORD:\n',
        '\t • Visit: https://myaccount.google.com/apppasswords\n',
        '\t • Select "Mail" or "Other (Custom name)"\n',
        '\t • Copy the 16-character password\n',
        '\t • Add to .env file: GMAIL_APP_PASSWORD=abcdefghijklmnop\n',
        '\n',
        '🚀 AVAILABLE COMMANDS:\n',
        '\t config         - Set up your personal information\n',
        '\t to             - Configure recipient details\n',
        '\t set msg        - Create birthday message\n',
        '\t set date       - Set recipient\'s birthday\n',
        '\t email send     - Send birthday email now\n',
        '\t email test     - Test email configuration\n',
        '\t email status   - Check setup status\n',
        '\t send           - Quick send (shortcut)\n',
        '\t help           - Show all commands\n',
        '\t version        - Show version info\n',
        '\n',
        '🤝 CONTRIBUTE:\n',
        '\t GitHub: https://github.com/Pericles001/birthday_mailer_cli\n',
        '\t We welcome contributions, bug reports, and feature requests!\n',
        '\n',
        '💡 This tool is actively developed and new features are coming soon.\n',
        'Thank you for using Birthday Mailer CLI! 🎂\n'
    );
    ask.close();
};

export {info};

