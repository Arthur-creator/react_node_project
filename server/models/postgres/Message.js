const {Model, DataTypes, Sequelize} = require("sequelize");
const connection = require('./db') ;

class Message extends Model {}

Message.init(
    {
        text:{
            type:DataTypes.STRING,
            allowNull: false,
        },
        is_read: {
            type: DataTypes.BOOLEAN,
            defaultValue: false,
            allowNull: false
        },
        createdAt: {
            type: DataTypes.DATE,
            allowNull:false,
            defaultValue:  Sequelize.fn('now')
        },
        updatedAt: {
            type: DataTypes.DATE,
            allowNull:true
        }
    },
    {
        sequelize: connection,
        modelName: 'message',
        paranoid: true,
    }
) ;

module.exports = Message ;