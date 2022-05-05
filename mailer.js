#!/usr/bin/node

/**
 * Script written to help automate birthday messages to friends and relatives
 * via email
 *
 *
 *
 */

(() => {
  console.log('USAGE : bd_mailer [--help] [--info] [--status] [--version] \n',
    '<command> [<args>]\n',
    '\n',
    'A list of usual commands accepted by bd_mailer are exposed here:\n',
    '\n',
    'set your personal information up\n',
    '\t config \t Configure personal mailer account\n',
    '\n',
    "set your receiver's information\n",
    "\t to \t Configure receiver's personal details",
    '\n',
    "set your personal message\n",
    "\t set \t Set your message text",
    '\n',
    "\t list \t List your friend's information\n",
    "\t status  See status of your current transactions\n",
    "\t abort \t Abort the message sending"
  );
})();
