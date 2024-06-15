const roles = require("../../enums/roles");

// roles policies
const userPolicy = require("./user.policy");

const opts = {
    [roles.USER]: {
        can: userPolicy
    }
};

module.exports = opts;