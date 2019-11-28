const fs = require('fs');
let response = null;
let successResponse = require("../helpers/setSuccessResponse");
var template = fs.readFileSync('../api/mailApi/template.html');
template = template.toString();

    //IMPORTANT NOTE:
    // ALWAYS REMOVE THE API KEY BEFORE PUSHING TO THE REPOSITORY
module.exports = (data, res) => {
    //data to pass
    // {
    //     email: email,
    //     code: accessCode
    // }
    let apiKey = "";    //ASK API KEY FROM BARGASO
    template = template.replace("_CLAIMCODE_", data.code)

    const sendMail = (to, content) => {
        console.log(to);
        const sgMail = require('@sendgrid/mail');
        sgMail.setApiKey(apiKey);
        const msg = {
            to: to,
            from: 'xpressdocx@gmail.com',
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
    sendMail(data.email, template);
    response = successResponse(201, { "success": true }, "Code has been sent to your email!")
    res.send(response);
    // sendMail('chervin.tanilon@student.passerellesnumeriques.org', template);
    // sendMail('lalaine.garrido@student.passerellesnumeriques.org', template);
}

    //IMPORTANT NOTE:
    // ALWAYS REMOVE THE API KEY BEFORE PUSHING TO THE REPOSITORY