const jwt = require('jsonwebtoken')

const checkToken = (req, res, next) => {
    let token = req.get('token')

    jwt.verify(token, 'mi-secreto', (error, decoded) => {
        if (error) {
            return res.status(400).json({ 
                ok: false,
                error
             })
        }

        next()
    })
}

module.exports = {
    checkToken
}