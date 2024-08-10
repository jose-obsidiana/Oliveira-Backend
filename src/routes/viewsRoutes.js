const { Router } = require("express")

const router = Router();

const products = [
    {
        "title": "Plato",
        "category": "Electrodomésticos",
        "description": "Plato de cerámica",
        "price": 1700,
    },
    {
        "title": "Jarra",
        "category": "Electrodomésticos",
        "description": "Jarra de cerámica",
        "price": 2700,
    },
    {
        "title": "Taza",
        "category": "Electrodomésticos",
        "description": "Taza de cerámica",
        "price": 1200,
    }
]


router.get('/', (req, res) => {

    const userLogin = {
        full_name: 'Jose Oliveira',
        role: 'admin'
    }

    res.render('index', {
        title: 'Home',
        style: 'index.css',
        user: userLogin,
        isAdmin: userLogin.role === 'admin',
        products
    })
})

module.exports = router