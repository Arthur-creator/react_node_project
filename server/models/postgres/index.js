exports.connection = require("./db");
exports.User = require("./User");
exports.Post = require("./Post");
exports.Message = require('./Message') ;

exports.Post.belongsTo(exports.User);

exports.Message.belongsTo(exports.User,{as: 'author'}) ;
exports.Message.belongsTo(exports.User,{as: 'sendTo'}) ;

exports.Post.addHook("afterCreate", (post) => {});

