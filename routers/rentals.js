import { Router } from 'express';

import { deleteRental, getRentals, postRentals, returnRental } from '../controllers/rentals.js';
import { postRentalsMiddleware } from '../middlewares/rentals.js';

const rentalsRouter = Router()

rentalsRouter.get('/rentals', getRentals)
rentalsRouter.post('/rentals', postRentalsMiddleware, postRentals)
rentalsRouter.post('/rentals/:id/return', returnRental)
rentalsRouter.delete('/rentals/:id', deleteRental)

export default rentalsRouter