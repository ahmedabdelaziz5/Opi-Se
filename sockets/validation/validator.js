// middleware function to validate Joi validation schema for socket connections

exports.validateEvent = (schema, data) => {
    let validation = []
    let validationResult = schema.body.validate(data);
    if (validationResult.error) {
        validation.push(validationResult.error.details[0].message);
    }
    if (validation.length) {
        return {
            success: false,
            message: validation.join(),
        };
    }
    return {
        success: true,
        message: "success"
    };
};
