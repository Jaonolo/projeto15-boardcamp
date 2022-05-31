import Joi from "joi";

const schema = Joi.object({
    name: Joi.string().required(),
    phone: Joi.string().min(10).max(11).regex(/^[0-9]+$/).required(),
    cpf: Joi.string().length(11).regex(/^[0-9]+$/).required(),
    birthday: Joi.date().required(),
})

export const postCustomersMiddleware = (req, res, next) => {
    if (schema.validate(req.body).error)
        return res.sendStatus(400)
    
    next()
}