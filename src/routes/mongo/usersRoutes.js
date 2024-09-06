// const { Router } = require("express");
// const userModel = require('../../models/usersModel.js')
// const UserModelDaos = require("../../daos/MONGO/usersDaos.mongo.js");

// const router = Router()
// const userService = new UserModelDaos()

// // router.get('/', async (req, res) => {

// //     const users = await userModel.find({ first_name: "Celia" }).explain("executionsStats")
// //     console.log(users)
// //     res.send({ status: 'success', payload: users })
// // })

// router.get('/', async (req, res) => {

//     let limit = 20;
//     let page = req.query.page || 1;

//     //    const usersLista = await userService.getUsers()
//     const users = await userModel.paginate({}, { limit, page })

//     const usersMap = users.docs.map(user => {
//         const { _id, ...rest } = user.toObject();
//         return rest;
//     })



//     // res.render('users', {
//     //     title: 'Usuarios',
//     //     users: usersMap,
//     //     hasPrevPage: users.hasPrevPage,
//     //     hasNextPage: users.hasNextPage,
//     //     prevPage: users.prevPage,
//     //     nextPage: users.nextPage,
//     //     currentPage: users.page,
//     //     totalPages: users.totalPages

//     // })
//     // })


//     // router.post('/', async (req, res) => {
//     //     const { body } = req

//     //     if (!body.first_name || !body.email) {
//     //         return res.status(400).send({ status: 'error', message: 'falta data' })
//     //     }

//     //     const result = await userModel.create(body)
//     //     res.send({ data: result })
//     // })


//     // router.put('/:uid', async (req, res) => {
//     //     const { uid } = req.params

//     //     let usersToReplace = req.body

//     //     if (!usersToReplace.first_name || !usersToReplace.email) {
//     //         return res.status(400).send({ status: 'error', message: 'falta data' })
//     //     }

//     //     const result = await userModel.updateOne({ _id: uid }, usersToReplace)
//     //     res.send({ status: 'success', message: 'Usuario actualizado' })
//     // })


//     // router.delete('/:uid', async (req, res) => {
//     //     const { uid } = req.params

//     //     const result = await userModel.deleteOne({ _id: uid })
//     //     res.send({ status: 'success', message: 'Usuario borrado' })
//     // })



//     module.exports = router