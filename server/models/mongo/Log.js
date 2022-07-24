const mongoose = require("./db");

const LogSchema = new mongoose.Schema({
    status:String, // OK or KO
    isServer:Boolean, // To know if it from user or server
    action:String, // CREATE NEW USER / CREATE NEW MESSAGE / ERROR FETCH USERS ...
});

const Log = mongoose.model('logs', LogSchema);

module.exports = Log;
