// function to check if the user has a relationship with the other partner 
const mongoose = require('mongoose');
const { getFromCache } = require('../services/checkCachedRelations');

exports.hasRelationship = () => {
    return async (req, res, next) => {
        try {
            const { matchId } = req.query;
            const userId = req.user.id;
            if (!mongoose.Types.ObjectId.isValid(matchId)) {
                return res.status(401).json({
                    message: "Unauthorized Relationship !"
                })
            }
            const result = await getFromCache(matchId, userId);
            if (!result.success) {
                return res.status(result.statusCode).json({
                    message: result.message
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
};