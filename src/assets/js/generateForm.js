var clearance = require("./clearance")
exports.generateForm = (data, res) => {
    if (data.type == "clearance") {
        clearance.clearance(data, res)
    }
}