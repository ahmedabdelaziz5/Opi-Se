// function to check if the user has a relationship with the other partner 
const { client } = require('../config/redis.config');
const mongoose = require('mongoose');

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
            const result = await client.get(matchId);
            if (!result) {
                return res.status(401).json({
                    message: "Unauthorized Relationship !"
                })
            }
            const match = JSON.parse(result).find((match) => match._id === userId);
            if (!match) {
                return res.status(401).json({
                    message: "Unauthorized Relationship !"
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
}