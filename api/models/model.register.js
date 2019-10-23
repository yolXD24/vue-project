let models = require("../db.model");
module.exports = function (reqUsername, reqEmail,reqBody, res) {
    models.Staffs.find({ username: reqUsername, email: reqEmail },
        (err, account) => {
            if (account.length) {
                res.status(200).json({ exist: true });
            } else {
                let staff = new models.Staffs(reqBody);
                staff
                    .save()
                    .then(() => {
                        res.status(201).json({ exist: false });
                    })
                    .catch(err => {
                        res.status(200).json({ exist: true });
                    });
            }
        }
    ).catch(err => {
        if (err) {
            res.status(503).json({
                message: 'Service unavailable'
            });
        }
    })
}