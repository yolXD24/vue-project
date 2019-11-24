let models = require("../model/db.model");
module.exports = function(reqBody, res) {
    models.Staffs.findOneAndRemove(
        reqBody, { password: 0, admin: 0 },
        (err, account) => {
            if (!err) {
                res_layout.data.body.success = true
                return res.send(res_layout);
            } else {
                return res.send(res_layout);
            }
        }
    ).catch(err => {
        if (err) {
            res_layout.status = 503
            res_layout.error.message = "Service unavailable"
            res_layout.error.body = err
            res.send(res_layout);
        }
    });

}