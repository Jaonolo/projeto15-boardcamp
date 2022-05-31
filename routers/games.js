import { Router } from 'express';

import { getGames, postGames } from '../controllers/games.js'
import { postGamesMiddleware } from '../middlewares/games.js';

const gamesRouter = Router()

gamesRouter.get('/games', getGames)
gamesRouter.post('/games', postGamesMiddleware, postGames)

export default gamesRouter