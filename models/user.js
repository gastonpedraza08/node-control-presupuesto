module.exports = (sequelize, DataTypes) => {
    return sequelize.define('user', {
        id: {
            type: DataTypes.INTEGER,
            primaryKey: true,
            autoIncrement: true
        },
        username: {
            type: DataTypes.STRING(20),
            allowNull: false,
            trim: true
        },
        email: {
            type: DataTypes.STRING,
            unique: true,
            allowNull: false,
            trim: true
        },
        password: {
            type: DataTypes.STRING,
            allowNull: false,
            trim: true
        },
        estado: {
            type: DataTypes.BOOLEAN,
            defaultValue: true
        }
    })
}