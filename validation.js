const Joi = require('@hapi/joi');

//register validation functions
const registerValidator = (data) => {
    const schema = Joi.object({
        name: Joi.string().min(4).required(),
        email: Joi.string().min(6).email(),
        password: Joi.string().min(6)
    });
    return schema.validate(data);
};

const loginValidator = (data) => {
    const schema = Joi.object({
        email: Joi.string().min(6).email(),
        password: Joi.string().min(6)
    });
    return schema.validate(data);
};

module.exports.registerValidator = registerValidator;
module.exports.loginValidator = loginValidator;