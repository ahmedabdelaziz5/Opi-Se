const roles = require("../../enums/roles");

// roles policies
const userPolicy = require("./user.policy");
const mentorPolicy = require("./mentor.policy");

const opts = {
    [roles.USER]: {
        can: userPolicy
    },
    [roles.MENTOR]: {
        can: mentorPolicy
    }
};

module.exports = opts;