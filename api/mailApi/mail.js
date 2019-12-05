const fs = require('fs');
let response = null;
let successResponse = require("../helpers/setSuccessResponse");
let errorResponse = require("../helpers/setErrorResponse");
var template = fs.readFileSync('../api/mailApi/template.html');
template = template.toString();

    //IMPORTANT NOTE!!!
    // ALWAYS REMOVE THE API KEY BEFORE PUSHING TO THE REPOSITORY
module.exports = (data, res) => {
    //data to pass
    // {
    //     email: email,
    //     code: accessCode
    // }
    //DocxpressKey = docxpressSG.xYWkXNMZTfyQ4r96EdGVMg.PLtzVcgBEdocxpressB19xkZx9PiPis_ZnPaKAmOikVC38fx-nXo
    let apiKey = "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";    
    template = template.replace("_CLAIMCODE_", data.code)

    const sendMail = (to, content) => {
        console.log(to);
        const sgMail = require('@sendgrid/mail');
        sgMail.setApiKey(apiKey);
        const msg = {
            to: to,
            from: 'XpressDocX@gmail.com',
            subject: 'XpressDocX Claim Code!',
            text: 'test',
            html: content
        };
        if (sgMail.send(msg)) {
            console.log("succes");
            response = successResponse(201, { "success": true }, "Code has been sent to your email!")
            res.send(response);
        } else {
            response = errorResponse(500, { "success": false }, "Something went wrong!")
            res.send(response);
            console.log('error')
        };
    };
    sendMail(data.email, template);
}

