const chatService = require('./socket.service')
const logger = require('../../services/logger.service')

async function getChat(req, res) {
    console.log(req.query);
    const chat = await chatService.getById(req.params.id)
    res.json(chat)
}

async function checkChat(chat) {
    const checkedChat = await chatService.getChat(chat);
    return checkedChat
}

async function getMsg(req, res) {
    try {
        const msgs = await msgService.query(req.query)
        res.send(msgs)
    } catch (err) {
        throw err;
    }
}

async function deleteMsg(req, res) {
    await msgService.remove(req.params.id)
    res.end()
}

async function updateChat(chat) {
    await chatService.update(chat)
    res.json(msg)
}




module.exports = {
    getChat,
    getMsg,
    deleteMsg,
    updateChat,
    checkChat
}