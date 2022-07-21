const {Model, DataTypes} = require("sequelize");
const connection = require('./db') ;

class Message extends Model {}

Message.init(
    {
        text:{
            type:DataTypes.TEXT,
            allowNull: false,
        },
        is_read: {
            type: DataTypes.BOOLEAN,
            defaultValue: false,
            allowNull: false
        },
        authorId: {
            type: DataTypes.INTEGER,
            allowNull:false,
            references: {
                model: 'user',
                key: 'id'
            }
        },
        sendToId: {
            type: DataTypes.INTEGER,
            allowNull:false,
            references: {
                model: 'user',
                key: 'id'
            }
        },
        createdAt: {
            type: DataTypes.DATE,
            allowNull:false,
        },
        updatedAt: {
            type: DataTypes.DATE,
            allowNull:true
        },
    },
    {
        sequelize: connection,
        modelName: 'message',
        paranoid: true,
        freezeTableName: true

    }
) ;

module.exports = Message ;