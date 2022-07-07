exports.connection = require("./db");
exports.User = require("./User");

exports.Post.belongsTo(exports.User);

exports.Post.addHook("afterCreate", (post) => {});