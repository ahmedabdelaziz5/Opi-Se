// function to validate Joi validation schema 
exports.validator = (schema, type = 'body') => {
    return (req, res, next) => {

        let validation = []
        let bodyValidation, paramsValidation;

        // in case we need to validate body
        if (type === 'body' || type === 'bodyAndParams') {
            bodyValidation = schema.body.validate(req.body);
            if (bodyValidation.error) {
                validation.push(bodyValidation.error.details[0].message)
            }
        }

        // in case we need to validate params
        if (type === 'params' || type === 'bodyAndParams') {
            paramsValidation = schema.params.validate(req.query);
            if (paramsValidation.error) {
                validation.push(paramsValidation.error.details[0].message)
            }
        }

        if (validation.length) {
            return res.status(400).json({
                success: false,
                error: "Validation Error !",
                message: validation.join(),
            });
        }

        next();
    }

};