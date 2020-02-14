var ImapClient = require('emailjs-imap-client').default;
const UiPath = require('uipath-orchestrator-api-module');
const UiConfig = require('./config');

//Creating Imap Client
var client = new ImapClient('imap.gmail.com', 993, {
  auth: {
    user: 'rajbca00@gmail.com',
    pass: 'rajeshbca'
  },
  logLevel: 'info'
});

//Creating UiPath Client
const ui = new UiPath(UiConfig.uiConfig);
const { clientId, refreshToken } = UiConfig.uiCredential;

client.connect().then(async () => {
  await ui.authUser_Cloud(clientId, refreshToken);
  await ui.logMessage('Imap connection established', 'Info');
  await client
    .listMessages('INBOX', '1:10', ['uid', 'flags', 'body[]'])
    .then(messages => {
      messages.forEach(message =>
        console.log('Flags for ' + message.uid + ' subject' + message.subject)
      );
      console.log(messages[0]);
    });
  await client.close();
});
