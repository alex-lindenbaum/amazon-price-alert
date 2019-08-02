import Joi from 'joi';

export const validateBody = schema => {
    return user => Joi.validate(user, schema);
};

export const schemas = {
    authSchema: Joi.object({
        email: Joi.string().email().required(),
        password: Joi.string().required()
    }).required(),

    newItemSchema: Joi.object({
        uri: Joi.string().uri().required(),
        targetPrice: Joi.number().required(),
        sendAlerts: Joi.boolean().required()
    }).required()
};