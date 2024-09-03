const { Router } = require("express");
const userModel = require('../../models/usersModel.js')


const router = Router()

router.get('/', async (req, res) => {

    const users = await userModel.find()

    res.send({ status: 'success', payload: users })
})


router.post('/', async (req, res) => {
    const { body } = req

    if (!body.first_name || !body.email) {
        return res.status(400).send({ status: 'error', message: 'falta data' })
    }

    const result = await userModel.create(body)
    res.send({ data: result })
})


router.put('/:uid', async (req, res) => {
    const { uid } = req.params

    let usersToReplace = req.body

    if (!usersToReplace.first_name || !usersToReplace.email) {
        return res.status(400).send({ status: 'error', message: 'falta data' })
    }

    const result = await userModel.updateOne({ _id: uid }, usersToReplace)
    res.send({ status: 'success', message: 'Usuario actualizado' })
})


router.delete('/:uid', async (req, res) => {
    const { uid } = req.params

    const result = await userModel.deleteOne({ _id: uid })
    res.send({ status: 'success', message: 'Usuario borrado' })
})

module.exports = router