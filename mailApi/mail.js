const fs = require('fs');
var template = fs.readFileSync('./template.html');
template = template.toString();
template = template.replace("_CLAIMCODE_", 1234)

const sendMail = (to, content) => {
    const sgMail = require('@sendgrid/mail');
    sgMail.setApiKey("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");
    const msg = {
        to: to,
        from: 'yoltorres24@gmail.com',
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