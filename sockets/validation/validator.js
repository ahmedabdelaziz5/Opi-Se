// middleware function to validate Joi validation schema for socket connections

exports.validateEvent = (schema) => {
    return (data, next) => {
        let validation = []
        let validationResult = schema.body.validate(data);
        if (validationResult.error) {
            validation.push(validationResult.error.details[0].message);
        }
        if (validation.length) {
            return next({
                success: false,
                message: validation.join(),
            });
        }
        next();
    };
};
