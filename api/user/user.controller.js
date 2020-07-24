const userService = require('./user.service')
const logger = require('../../services/logger.service')

async function getUser(req, res) {
    // console.log('user', req.params.id);
    const user = await userService.getById(req.params.id)
    console.log('user123', user);
    res.send(user)
}

async function getUsers(req, res) {
    const users = await userService.query(req.query)
    logger.debug(users);
    res.send(users)
}

async function deleteUser(req, res) {
    await userService.remove(req.params.id)
    res.end()
}

async function updateUser(req, res) {
    const user = req.body
    console.log('user:', user);
    await userService.update(user)
    res.send(user)
}

module.exports = {
    getUser,
    getUsers,
    deleteUser,
    updateUser
}