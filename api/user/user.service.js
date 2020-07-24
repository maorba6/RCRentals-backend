const dbService = require('../../services/db.service')
const orderService = require('../order/order.service')
const ObjectId = require('mongodb').ObjectId

module.exports = {
    query,
    getById,
    getByEmail,
    remove,
    update,
    add
}


async function query(filterBy = {}) {
    const criteria = _buildCriteria(filterBy)

    const collection = await dbService.getCollection('user')
    try {
        const users = await collection.find(criteria).toArray();

        return users
    } catch (err) {
        throw err;
    }
}


function _buildCriteria(filterBy) {
    const criteria = {};
    if (filterBy.name) {
        var filterName = new RegExp(filterBy.name, 'i')
        criteria.fullName = { $regex: filterName }
    }
    return criteria;
}

async function getById(userId) {
    const collection = await dbService.getCollection('user')
    try {
        const user = await collection.findOne({ "_id": ObjectId(userId) })
        delete user.password
        // user.givenOrders = await orderService.query({ byUserId: ObjectId(user._id) })
        // user.givenOrders = user.givenOrders.map(order => {
        // delete order.byUser
        // return order
        // })
        return user
    } catch (err) {
        console.log(`ERROR: while finding user ${userId}`)
        throw err;
    }
}
async function getByEmail(email) {
    const collection = await dbService.getCollection('user')
    try {
        const user = await collection.findOne({ email })
        return user
    } catch (err) {
        console.log(`ERROR: while finding user ${email}`)
        throw err;
    }
}

async function remove(userId) {
    const collection = await dbService.getCollection('user')
    try {
        await collection.deleteOne({ "_id": ObjectId(userId) })
    } catch (err) {
        console.log(`ERROR: cannot remove user ${userId}`)
        throw err;
    }
}

async function update(user) {
    console.log('update');
    const collection = await dbService.getCollection('user')
    user._id = ObjectId(user._id);
    console.log('id:', user._id);
    try {
        await collection.replaceOne({ "_id": user._id }, { $set: user })
        console.log(user);
        return user
    } catch (err) {
        console.log(`ERROR: cannot update user ${user._id}`)
        throw err;
    }
}

async function add(user) {
    const collection = await dbService.getCollection('user')
    user.isAdmin = false
    user.createdAt = Date.now()
    user.favCars = []
    try {
        await collection.insertOne(user);
        return user;
    } catch (err) {
        console.log(`ERROR: cannot insert user`)
        throw err;
    }
}