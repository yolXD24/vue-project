const fs = require('fs');
var template = fs.readFileSync('./template.html');
template = template.toString();
template = template.replace("_CLAIMCODE_", 1234)

const sendMail = (to, content) => {
    const sgMail = require('@sendgrid/mail');
    sgMail.setApiKey(apiKey);
    const msg = {
        to: to,
        from: 'XpressDocX@protonmail.com',
        subject: 'XpressDocX Claim Code!',
        text: 'test',
        html: content
    };
    if (sgMail.send(msg)) {
        console.log('sent');
    } else {
        console.log('error')
    };
};
sendMail('leonilojr.torres@student.passerellesnumeriques.org', template);
// sendMail('renan.bargaso@student.passerellesnumeriques.org', template);
// sendMail('chervin.tanilon@student.passerellesnumeriques.org', template);
// sendMail('lalaine.garrido@student.passerellesnumeriques.org', template);