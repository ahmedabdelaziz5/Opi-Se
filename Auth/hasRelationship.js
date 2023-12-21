const { client } = require('../config/redis.config');
exports.hasRelationship = async (req, res, next) => {
    try {
        const { matchId } = req.query;
        const userId = req.user.id;
        const result = await client.get(matchId);
        if (!result) {
            return res.status(401).json({
                message: "Not Authorized !"
            })
        }
        const match = JSON.parse(result).find((match) => match._id === userId);
        if (!match) {
            return res.status(401).json({
                message: "Not Authorized !"
            })
        }
        next();
    }
    catch (err) {
        return res.status(500).json({
            message: "error",
            error: err.message
        })
    }
}