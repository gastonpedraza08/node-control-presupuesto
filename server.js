const express = require('express')
const app = express()
const { checkToken } = require('./middleware')

require('./database')

// Add headers
app.use(function (req, res, next) {
    res.setHeader('Access-Control-Allow-Origin', 'http://localhost:3000');
    res.setHeader('Access-Control-Allow-Methods', 'GET, POST, OPTIONS, PUT, PATCH, DELETE');
    // Request headers you wish to allow
    res.setHeader('Access-Control-Allow-Headers', 'X-Requested-With,content-type, token');
    // Set to true if you need the website to include cookies in the requests sent
    // to the API (e.g. in case you use sessions)
    res.setHeader('Access-Control-Allow-Credentials', true);
    // Pass to next layer of middleware
    next();
});
    

app.use(express.json())
app.use(express.urlencoded({extended: true}))
app.use('/api/users', require('./routes/app').router)
app.use('/api/users', require('./routes/transaction').router)
app.use('/api/users', require('./routes/auth/auth').router)



app.listen(4000, () => {
    console.log("Escuchando el puerto 4000")
})