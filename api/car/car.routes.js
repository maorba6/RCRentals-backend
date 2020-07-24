const express = require('express')
const { requireAuth } = require('../../middlewares/requireAuth.middleware')
const { getCar, getCars, deleteCar, updateCar, addCar } = require('./car.controller')
const router = express.Router()

router.get('/', getCars);
router.get('/:id', getCar);
router.post('/', addCar);
// router.delete('/:id', deleteCar);
router.put('/:id', requireAuth, updateCar)
router.delete('/:id', requireAuth, deleteCar)

module.exports = router