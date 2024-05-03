const express = require('express');
const router = express.Router();
const gameController = require('../controllers/gameController');

router.get('/games', gameController.getGames)
router.get('/games/:id', gameController.getGame)
router.post('/games', gameController.createGame)
router.put('/games', gameController.editGame)
router.delete('/games/:id', gameController.deleteGame)

module.exports = router;
