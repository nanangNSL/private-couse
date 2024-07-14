const {getUser, postUser, editUser, deleteUser} = require("../model/userModel")

const getUserController = async (req, res) => {
    try {
        const data = await getUser()
        if(!data) throw new Error("Data Not Found")
        res.send(data)
    } catch (error) {
        res.send(error)
    }
}

const postUserController = async (req, res) => {
    try {
        const data = await postUser(req.body?.name)
        if(!data) throw new Error("Data Not Found")
        res.send(data)
    } catch (error) {
        res.send(error)
    }
}

const editUserController = async (req, res) => {
    try {
        const data = await editUser(req.params?.ID, req.body?.name)
        if(!data) throw new Error("Data Not Found")
        res.send(data)
    } catch (error) {
        res.send(error)
    }
}

const deleteUserController = async (req, res) => {
    try {
        const data = await deleteUser(req.params?.ID)
        if(!data) throw new Error("Data Not Found")
        res.send(data)
    } catch (error) {
        res.send(error)
    }
}

module.exports = { user: getUserController, post: postUserController, edit: editUserController, deleteUser: deleteUserController }