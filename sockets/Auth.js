// function to check Authentication in sockets 
const { getTokenData } = require('../helpers/getTokenData');
const { getRelationship } = require('../services/checkCachedRelations');

exports.checkSocketAuth = async (token, matchId) => {
    try {
        const tokenData = getTokenData(token);
        if (!tokenData.success) {
            return {
                success: false,
                message: "Not Authorized !",
            }
        }
        const relationship = await getRelationship(matchId, tokenData.id);
        if (!relationship.success) {
            return {
                success: false,
                message: "Not Authorized !",
            }
        }
        return {
            success: true,
            message: "success",
        }
    }
    catch (err) {
        return {
            success: false,
            message: `error while authenticating !`,
        }
    }
};