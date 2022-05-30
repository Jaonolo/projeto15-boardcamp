import { Router } from 'express';

import { getCategories, postCategories } from '../controllers/categories.js'
import { postCategoriesMiddleware } from '../middlewares/categories.js';

const categoriesRouter = Router()

categoriesRouter.get('/categories', getCategories)
categoriesRouter.post('/categories', postCategoriesMiddleware, postCategories)

export default categoriesRouter