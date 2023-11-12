const relationshipModel = require('./relationship.model');

// when the 2 users are matched it creates the relationship in the database 
exports.createRelationship = async (relationshipInfo) => {
    try {
        const relationship = await relationshipModel.create(relationshipInfo);
        if (!relationship) {
            return {
                success: false,
                statusCode: 404,
                message: "error",
                error: "unexpected error !"
            }
        }
        return {
            success: true,
            statusCode: 200,
            message: "success",
            data: relationship
        }
    }
    catch (err) {
        return {
            success: false,
            statusCode: 500,
            message: "error",
            error: err.message
        }
    }
};

// check if the relationship is exist in the database
exports.isExist = async (relationshipId) => {
    try {
        const relationship = await relationshipModel.findOne(relationshipId);
        if (!relationship) {
            return {
                success: false,
                statusCode: 404,
                message: "error",
                error: "can't find relationship !"
            }
        }
        return {
            success: true,
            statusCode: 200,
            message: "success",
            data: relationship
        }
    }
    catch (err) {
        return {
            success: false,
            statusCode: 500,
            message: "error",
            error: err.message
        }
    }
};
