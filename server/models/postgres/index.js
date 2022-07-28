const Friends = require("./Friends");
exports.connection = require("./db");
exports.User = require("./User");
exports.Message = require('./Message') ;
exports.Friends = require('./Friends') ;

exports.Message.belongsTo(exports.User,{as: 'author'}) ;
exports.Message.belongsTo(exports.User,{as: 'sendTo'}) ;

exports.User.belongsToMany(exports.User,{
    as: 'user_id',
    foreignKey: 'user_id',
    through: Friends
}) ;
exports.User.belongsToMany(exports.User,{
    as: 'friend_id',
    foreignKey: 'friend_id',
    through: Friends
}) ;