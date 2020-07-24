const dbService = require('../../services/db.service')
const ObjectId = require('mongodb').ObjectId

module.exports = {
    query,
    getById,
    remove,
    update,
    add,
    getChat
}

async function query(filterBy = {}) {

    const criteria = _buildCriteria(filterBy)

    console.log(criteria);
    const collection = await dbService.getCollection('chats')
    try {
        const msgs = await collection.find(criteria).toArray();
        console.log('msgsservc', msgs);
        return msgs
    } catch (err) {
        console.log('ERROR: cannot find msgs')
        throw err;
    }
}

function _buildCriteria(filterBy) {
    var criteria = {}
    if (filterBy.minPrice) {
        criteria =
            ({
                $and: [{
                        $and: [{ price: { $lt: Number(filterBy.maxPrice) } },
                            { price: { $gt: Number(filterBy.minPrice) } }
                        ]
                    },
                    {
                        $and: [{ model: { $lt: Number(filterBy.maxModel) } },
                            { model: { $gt: Number(filterBy.minModel) } }
                        ]
                    }
                ]
            })
    }
    if (filterBy.tag) {
        criteria.tags = filterBy.tag
    }

    return criteria;
}


async function getChat(chat) {
    const collection = await dbService.getCollection('chat')
    try {
        // const chatGet = await collection.find({ $and: [{ usersIds: "1" }, { usersIds: "2" }] }).toArray()
        const chatGet = await collection.find({ $and: [{ usersIds: `${chat.usersIds[0]}` }, { usersIds: `${chat.usersIds[1]}` }] }).toArray()
            // const chatGet = await collection.find({ usersIds: ["1", "2"] })
            // db.getCollection('chat').find({ "usersIds": /.*3.*/ } && { "usersIds": /.*1.*/ });
            // const chatGet = await collection.find({ "buyer": ObjectId(chat.buyer), "seller": ObjectId(chat.seller) })
            // const chatGet = await collection.find({ "usersIds": `${chat.usersIds[0]}` } && { "usersIds": `${chat.usersIds[1]}` })
            // const chatGet = await collection.find({ "usersIds": `/.*${chat.usersIds[0]}.*/` } && { "usersIds": `/.*${chat.usersIds[1]}.*/` })
        if (!chatGet.length || !chatGet) {
            var newChat = await add(chat)
            return newChat
        }
        return chatGet
    } catch (err) {
        console.log(`ERROR: while finding chat`)
        throw err;

    }
}


async function add(chat) {
    const collection = await dbService.getCollection('chat')
    try {
        await collection.insertOne(chat);
        return chat;
    } catch (err) {
        console.log(`ERROR: cannot insert chat`)
        throw err;
    }
}




async function getById(msgId) {
    const collection = await dbService.getCollection('msg')
    try {
        const msg = await collection.findOne({ "_id": ObjectId(msgId) })
        return msg
    } catch (err) {
        console.log(`ERROR: while finding msg ${msgId}`)
        throw err;
    }
}

async function remove(msgId) {
    const collection = await dbService.getCollection('msg')
    try {
        await collection.deleteOne({ "_id": ObjectId(msgId) })
    } catch (err) {
        console.log(`ERROR: cannot remove msg ${msgId}`)
        throw err;
    }
}

async function update(chat) {
    const collection = await dbService.getCollection('chat')
    chat._id = ObjectId(chat._id);

    try {
        await collection.replaceOne({ "_id": chat._id }, { $set: chat })
        return chat
    } catch (err) {
        console.log(`ERROR: cannot update msg `)
        throw err;
    }
}