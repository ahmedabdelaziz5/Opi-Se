// function to get the relationship from redis
const { client } = require('../config/redis.config');

exports.getRelationship = async (matchId, userId) => {
    try {
        const result = await client.get(matchId);
        if (!result) {
            return {
                success: false,
                statusCode: 401,
                message: "Unauthorized Relationship !"
            }
        }
        const match = JSON.parse(result).find((match) => match._id === userId);
        if (!match) {
            return {
                success: false,
                statusCode: 401,
                message: "Unauthorized Relationship !"
            }
        }
        return {
            success: true,
            statusCode: 200,
            message: "success"
        }
    }
    catch (err) {
        console.log(err.message);
    }
};