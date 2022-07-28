// Create User model using sequelize with email, password, firstname and isAdmin
const { Model, DataTypes } = require("sequelize");
const connection = require("./db");


class Friends extends Model {}

Friends.init(
    {
        user_id: {
            type:Boolean,
            defaultValue:null,
        },
        friend_id: {
            type:Boolean,
            defaultValue:null,
        }
    },
    {
        sequelize: connection,
        modelName: "friends",
        paranoid: true,
    }
);


module.exports = Friends;
