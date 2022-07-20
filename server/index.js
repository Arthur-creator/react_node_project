const express = require("express");
const UserRouter = require("./routes/user");
const SecurityRouter = require("./routes/security");
const verifyToken = require("./middlewares/verifyToken");
const app = express();

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
