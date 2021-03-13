module.exports = (sequelize, DataTypes) => {
    return sequelize.define('transaction', {
        id: {
            type: DataTypes.INTEGER,
            primaryKey: true,
            autoIncrement: true
        },
        concepto: {
            type: DataTypes.STRING(50),
            allowNull: false,
            trim: true
        },
        monto: {
            type: DataTypes.DOUBLE,
            allowNull: false,
            trim: true
        },
        fecha: {
            type: DataTypes.DATE,
            allowNull: false
        },
        tipo: {
            type: DataTypes.STRING(10),
            allowNull: false,
        },
        userId: {
            type: DataTypes.INTEGER,
            allowNull: false
        },
        estado: {
            type: DataTypes.BOOLEAN,
            defaultValue: true
        }
    })
}