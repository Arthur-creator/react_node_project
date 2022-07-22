const express = require("express");
const UserRouter = require("./routes/user");
const SecurityRouter = require("./routes/security");
const verifyToken = require("./middlewares/verifyToken");
const app = express();

const cors = require('cors');

const whitelist = ["http://localhost:3000"]
const corsOptions = {
    origin: function (origin, callback) {
        if (!origin || whitelist.indexOf(origin) !== -1) {
            callback(null, true)
        } else {
            callback(new Error("Not allowed by CORS"))
        }
    },
    credentials: true,
}
app.use(cors(corsOptions))

app.use(express.json());
app.use(
    express.urlencoded({
        extended: true,
    })
);

app.get("/", (req, res, next) => {
    console.log("test");
    res.json({
        title: "coucou",
    });
});

app.use("/", SecurityRouter);

app.use("/api", verifyToken, UserRouter);

app.listen(process.env.PORT, () => {
    console.log("Server is listening on port " + process.env.PORT);
});
