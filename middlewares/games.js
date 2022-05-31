import Joi from "joi";

const schema = Joi.object({
    name: Joi.string().required(),
    image: Joi.string().required(),
    stockTotal: Joi.number().greater(0).required(),
    categoryId: Joi.number().greater(0).required(),
    pricePerDay: Joi.number().greater(0).required(),
})

export const postGamesMiddleware = (req, res, next) => {
    if (schema.validate(req.body).error)
        return res.sendStatus(400)
    
    next()
}