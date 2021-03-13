const {Sequelize, DataTypes} = require('sequelize')

const sequelize = new Sequelize('personal_budges', 'root', '', {
    'host'       : 'localhost',
    'dialect'    : 'mysql'
})

const User = require('./models/user')(sequelize, DataTypes)
const Transaction = require('./models/transaction')(sequelize, DataTypes)



sequelize.sync()
    .then(() => {
        console.log("Conectado a la DB")
        console.log("===========================================================")
    })
    .catch(e => console.log(e))

module.exports = {
    User,
    Transaction
}