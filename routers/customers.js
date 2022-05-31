import { Router } from 'express';

import { getCustomerById, getCustomers, postCustomer, updateCustomer } from '../controllers/customers.js'
import { postCustomersMiddleware } from '../middlewares/customers.js';

const customersRouter = Router()

customersRouter.get('/customers', getCustomers)
customersRouter.get('/customers/:id', getCustomerById)
customersRouter.post('/customers', postCustomersMiddleware, postCustomer)
customersRouter.put('/customers/:id', postCustomersMiddleware, updateCustomer)

export default customersRouter