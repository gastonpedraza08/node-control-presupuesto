const router = require('express').Router()
const bcrypt = require('bcrypt')
const { User } = require('../../database')
const jwt = require('jsonwebtoken')

router.post('/signup', async (req, res) => {
    try {
        req.body.password = bcrypt.hashSync(req.body.password, 10)
        const user = await User.create(req.body)
        const token = jwt.sign({
            id: user.id,
            email: user.email
        }, 'mi-secreto', { expiresIn: 60 * 15 })
        let usu = {
            id: user.id,
            username: user.username,
            email: user.email
        }
        res.json({ 
            ok: true,
            user: usu,
            token
         })
    } catch(e) {
        res.status(400).json({ 
            ok: false,
            error: 'duplicated email' 
        })
    }
})

router.post('/login', async (req, res) => {
    const user = await User.findOne({ where: { email: req.body.email } })

    if (user) {
        const passValid = await bcrypt.compare(req.body.password, user.password)

        if (passValid) {
            const token = jwt.sign({
                id: user.id,
                email: user.email
            }, 'mi-secreto', { expiresIn: 60 * 30 })
            let usu = {
                id: user.id,
                username: user.username,
                email: user.email
            }
            res.json({ 
                ok: true,
                user: usu,
                token
             })
        } else {
            res.status(400).json({ 
                ok: false,
                error: 'invalid credentials'
            })
        }
    } else {
        res.status(400).json({ 
            ok: false,
            error: 'invalid credentials'
        })
    }
})

module.exports = {
    router
}


// router.get('/logout', (req, res) => {
//     req.logOut()
//     res.redirect('/signin')
// })