export default {
    name: "Name Checker",
    checkName(position) {
        var details = { account: null, disable: true }
        switch (position) {
            case "Secretary":
                details.account = ["Chervin", "Tanilon"];
                break;
            case "Teasurer":
                details.account = ["Renan", "Bargaso"];
                break;
            case "Brgy. Captain":
                details.account = ["Yol", "Torres"];
                break;
            case "Office on Duty":
                details.account = ["", ""];
                details.disable = false;
            default:
                break;
        }

        return details
    }
}