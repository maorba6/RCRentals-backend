
const dbService = require('../../services/db.service');
const loggerService = require('../../services/logger.service');
const ObjectId = require('mongodb').ObjectId

async function query() {
    // const criteria = _buildCriteria(filterBy)
    const collection = await dbService.getCollection('order')
    try {
        const orders = await collection.find().toArray();
        return orders
    } catch (err) {
        console.log('ERROR: cannot find orders')
        throw err;
    }
}

async function remove(orderId) {
    const collection = await dbService.getCollection('order')
    try {
        await collection.deleteOne({ "_id": ObjectId(orderId) })
    } catch (err) {
        console.log(`ERROR: cannot remove order ${orderId}`)
        throw err;
    }
}


async function add(order) {
    const collection = await dbService.getCollection('order')
    try {
        await collection.insertOne(order);
        return order;
    } catch (err) {
        logger.debug('cannot find orders')

        throw err;
    }
}

async function update(order) {
    const collection = await dbService.getCollection('order')
    order._id = ObjectId(order._id);

    try {
        await collection.replaceOne({ "_id": order._id }, { $set: order })
        return order
    } catch (err) {
        console.log(`ERROR: cannot update car ${order._id}`)
        throw err;
    }
}

// function _buildCriteria(filterBy) {
//     const criteria = {};
//     return criteria;
// }

module.exports = {
    query,
    remove,
    add,
    update
}


