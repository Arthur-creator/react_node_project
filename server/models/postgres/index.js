exports.connection = require("./db");
exports.User = require("./User");
exports.Post = require("./Post");
exports.Message = require('./Message') ;

exports.Post.belongsTo(exports.User);


exports.Post.addHook("afterCreate", (post) => {});

