// function which checks whether the given id is a valid ObjectId or not
const { isValidObjectId } = require('mongoose');

exports.isValidObjectId = (id) => {
    try {
        if (!isValidObjectId(id)) {
            return false;
        }
        return true;
    }
    catch (err) {
        console.log("error while checking the ObjectId !");
    }
};