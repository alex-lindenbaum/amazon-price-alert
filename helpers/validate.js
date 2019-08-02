const Joi = require('joi');

module.exports = {
    validateBody: schema => {
        return (req, res, next) => {
            const result = Joi.validate(req.body, schema);

            if (result.error)
                return res.status(400).json(result.error);

            if (!req.value)
                req.value = {};

            req.value['body'] = result.value;
            next();
        };
    },

    schemas: {
        authSchema: Joi.object({
            email: Joi.string().email().required(),
            password: Joi.string().required()
        }).required(),

        newItemListSchema: Joi.object({
            items: Joi.array().items(Joi.object({
                uri: Joi.string().uri().required(),
                targetPrice: Joi.number().required(),
                sendAlerts: Joi.boolean().required()
            })).required()
        }).required()
    }
};