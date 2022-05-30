import Joi from "joi";

const schema = Joi.object({
    name: Joi.string().required(),
})

export const postCategoriesMiddleware = (req, res, next) => {
    if (schema.validate(req.body).error)
        return res.sendStatus(400)
    
    next()
}