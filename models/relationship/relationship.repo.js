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
        console.log(err);
        return {
            success: false,
            statusCode: 500,
            message: "error",
            error: err.message
        }
    }
};

// check if the relationship is exist in the database
exports.isExist = async (filter) => {
    try {
        const relationship = await relationshipModel.findOne(filter);
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
        console.log(err);
        return {
            success: false,
            statusCode: 500,
            message: "error",
            error: err.message
        }
    }
};

// update relationship details
exports.updateRelationship = async (filter, query) => {
    try {
        const updatedRelationship = await relationshipModel.findOneAndUpdate(filter, query, { new: true });
        if (!updatedRelationship) {
            return {
                success: false,
                message: "relationship not found !",
            }
        }
        return {
            success: true,
            message: "relationship updated successfully !",
        }
    }
    catch (err) {
        console.log(err);
        return {
            success: false,
            statusCode: 500,
            message: err.message
        }
    }
};
