const dbService = require('../../services/db.service')
const ObjectId = require('mongodb').ObjectId

module.exports = {
    query,
    getById,
    remove,
    update,
    add
}

async function query(filterBy = {}) {
    const criteria = _buildCriteria(filterBy)
    const collection = await dbService.getCollection('car')
    try {
        const cars = await collection.find(criteria).toArray();
        return cars
    } catch (err) {
        throw err;
    }
}

function _buildCriteria(filterBy) {
    var criteria = {}
    if (filterBy.minPrice) {
        criteria =
            ({
                $and: [{
                    $and: [{ price: { $lte: Number(filterBy.maxPrice) } },
                    { price: { $gte: Number(filterBy.minPrice) } }]
                },
                {
                    $and: [{ model: { $lte: Number(filterBy.maxModel) } },
                    { model: { $gte: Number(filterBy.minModel) } }]
                }]
            })
    }
    if (filterBy.tag) {
        criteria.tag = filterBy.tag
    }
    if (filterBy.city) {
        var filterCity = new RegExp(filterBy.city, 'i');
        criteria.city = { $regex: filterCity }
    }
    console.log('cri', criteria);
    return criteria;
}


async function getById(carId) {
    const collection = await dbService.getCollection('car')
    try {
        const car = await collection.findOne({ "_id": ObjectId(carId) })
        return car
    } catch (err) {
        console.log(`ERROR: while finding car ${carId}`)
        throw err;
    }
}

async function remove(carId) {
    const collection = await dbService.getCollection('car')
    try {
        await collection.deleteOne({ "_id": ObjectId(carId) })
    } catch (err) {
        console.log(`ERROR: cannot remove car ${carId}`)
        throw err;
    }
}

async function update(car) {
    const collection = await dbService.getCollection('car')
    car._id = ObjectId(car._id);

    try {
        await collection.replaceOne({ "_id": car._id }, { $set: car })
        return car
    } catch (err) {
        console.log(`ERROR: cannot update car ${car._id}`)
        throw err;
    }
}

async function add(car) {
    const collection = await dbService.getCollection('car')
    try {
        await collection.insertOne(car);
        return car;
    } catch (err) {
        console.log(`ERROR: cannot insert car`)
        throw err;
    }
}




