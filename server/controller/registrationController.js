const {User} = require("../models/postgres");

exports.verifyUser = (req, res, next) => {
    User.findOne({
        confirmationCode: req.params.confirmationCode,
    })
    .then((user) => {
        if (!user) {
            return res.status(404).send({ message: "User Not found." });
        }

        user.isVerified = true;
        user.save((err) => {
            if (err) {
                res.status(500).send({ message: err });
                return;
            }
        });
    })
    .catch((e) => console.log("error", e));
};