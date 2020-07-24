const carService = require('./car.service')
const logger = require('../../services/logger.service')

async function getCar(req, res) {
    const car = await carService.getById(req.params.id)
    res.json(car)
}


async function getCars(req, res) {
    try {
        const cars = await carService.query(req.query)
        res.send(cars)
    } catch (err) {
        throw err;
    }
}

async function deleteCar(req, res) {
    await carService.remove(req.params.id)
    res.end()
}

async function updateCar(req, res) {
    const car = req.body;
    await carService.update(car)
    res.json(car)
}

async function addCar(req, res) {
    const car = req.body;
    await carService.add(car)
    res.json(car)
}


module.exports = {
    getCar,
    getCars,
    deleteCar,
    updateCar,
    addCar,
}