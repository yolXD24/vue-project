let models = require("../db.model");
module.exports = function (reqBody,res) {
    models.Staffs.findOneAndRemove(
        reqBody, { password: 0, admin: 0 },
        (err, account) => {
            if (!err) {
                return res.status(200).json(true);
            } else {
                return res.status(200).json(false);
            }
        }
    ).catch(err => {
        if (err) {
            res.status(503).json({
                message: 'Service unavailable'
            });
        }
    });

}