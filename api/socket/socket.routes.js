const { checkChat, getMsgs, deleteMsg, updateChat } = require('./socket.controller')
const dbService = require('../../services/db.service')
module.exports = connectSockets

function connectSockets(io) {
    io.on('connection', socket => {
        socket.on('get chat', async(chat) => {
            var newChat = await checkChat(chat)
            socket.emit('gotChat', newChat)
        })
        socket.on('chat message', async(chat) => {
            var newChat = await updateChat(chat)
            io.emit('messege recieved', newChat)
        })
    })
}