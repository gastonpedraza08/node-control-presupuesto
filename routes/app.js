const router = require('express').Router()
const { checkToken } = require('../middleware')

router.get('/dashboard', checkToken, (req, res) => {
    res.json({
        ok: true
    })
})

module.exports = {
    router
}


// router.get('/logout', (req, res) => {
//     req.logOut()
//     res.redirect('/signin')
// })