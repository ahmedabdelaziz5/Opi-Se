// function to validate Joi validation schema 
exports.validator = (schema) => {
    return (req, res, next) => {
        var validation = []
        var validationResult = schema.body.validate(req.body);
        if (validationResult.error) {
            validation.push(validationResult.error.details[0].message);
        }
        if (validation.length) {
            res.status(400).json({
                message: validation.join(),
            })
            return;
        }
        next();
    }
};
