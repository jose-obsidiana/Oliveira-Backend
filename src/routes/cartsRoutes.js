const { Router } = require("express");
const CartManager = require("../managers/cartsManager");

const router = Router();

const carts = new CartManager()


module.exports = router