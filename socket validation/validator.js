// function to validate Joi validation schema for socket connections

exports.validator = (data, schema) => {
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
        message: `data is valid !`,
    };
}
