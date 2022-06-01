import express from "express";
import dotenv from "dotenv"
import cors from "cors";

/* import routers */
import categoriesRouter from './routers/categories.js'
import gamesRouter from './routers/games.js'
import customersRouter from "./routers/customers.js";
import rentalsRouter from "./routers/rentals.js";
/* ==    -     == */

dotenv.config();
const { PORT } = process.env

const app = express();
app.use(express.json(), cors());

/* */
app.use(categoriesRouter)
app.use(gamesRouter)
app.use(customersRouter)
app.use(rentalsRouter)
/* */

app.get('/', () => 'https://github.com/Jaonolo/projeto15-boardcamp')

app.listen((PORT || 4000), () => console.log(`Server successfully running on port ${PORT}`));