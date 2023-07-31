const Joi = require('@hapi/joi');

const registerValidate = (data) => {

    const Schema = Joi.object({
        name: Joi.string().required().min(3).max(50),
        email: Joi.string().required().min(5).max(50),
        password: Joi.string().required().min(8).max(100),
    })

    return Schema.validate(data)
}

const loginValidate = (data) => {

    const Schema = Joi.object({
        email: Joi.string().required().min(5).max(50),
        password: Joi.string().required().min(8).max(100),
    })

    return Schema.validate(data)
}

module.exports.loginValidate = loginValidate;
module.exports.registerValidate = registerValidate;