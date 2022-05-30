import express from "express";
import dotenv from "dotenv"
import cors from "cors";

/* import routers */

/* ==    -     == */

dotenv.config();
const { PORT } = process.env

const app = express();
app.use(express.json(), cors());

/* */
/* */

app.listen(PORT, () => console.log(`Server successfully running on port ${PORT}`));