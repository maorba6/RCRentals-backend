const logger = require('../../services/logger.service')
const orderService = require('./order.service')

// TODO: needs error handling! try, catch

async function getOrders(req, res) {

    try {
        const orders = await orderService.query(req.query)
        console.log('orders:', orders);

        res.send(orders)
    } catch (err) {
        logger.error('Cannot get orders', err);
        res.status(500).send({ error: 'cannot get orders' })

    }
}

async function deleteOrder(req, res) {
    try {
        await orderService.remove(req.params.id)
        res.end()
    } catch (err) {
        logger.error('Cannot delete order', err);
        res.status(500).send({ error: 'cannot delete order' })
    }
}

async function addOrder(req, res) {
    const order = req.body
    order.byUser = req.session.user;
    order = await orderService.add(order)
    // order.aboutUser = {}
    console.log(order);
    res.send(order)
}




async function updateOrder(req, res) {
    const order = req.body
    await orderService.update(order)
    res.json(order)

}
module.exports = {
    getOrders,
    deleteOrder,
    addOrder,
    updateOrder
}