const bcrypt = require("bcryptjs");
let models = require("../db.model");
module.exports = function (reqId, reqPass, res) {
    models.Staffs.findById(reqId, (err, account) => {
        console.log("!account")
        if (account !== null) {
            bcrypt.compare(reqPass, account.password)
                .then(match => {
                    if (match) {
                        console.log("found")
                        res.status(200).send({ error: false, confirm: true })
                    } else {
                        console.log("!found")

                        res.status(200).send({ error: true, confirm: false })
                        return
                    }
                }).catch(err => {
                    console.log("!found")
                    res.json(err);
                });
        } else {
            res.status(200).send({ error: true, confirm: false })

        }
    }).catch(err => {
        if (err) {
            res.status(503).json({
                message: 'Service unavailable'
            });
        }
    })
}