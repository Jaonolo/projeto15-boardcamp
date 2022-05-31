import Joi from "joi";

const schema = Joi.object({
    customerId: Joi.number().required(),
    gameId: Joi.number().required(),
    daysRented: Joi.number().greater(0).required(),
})

export const postRentalsMiddleware = (req, res, next) => {
    if (schema.validate(req.body).error)
        return res.sendStatus(400)
    
    next()
}