const express = require("express");
const cors = require("cors") ;
const UserRouter = require("./routes/user");
const GetUserRouter = require('./routes/getUser') ;
const SecurityRouter = require("./routes/security");
const MessageRouter = require('./routes/message') ;
const MessageMongoRouter = require('./routes/messageMongo') ;
const MessageAnaylitcsRouter = require('./routes/messageAnalytiques') ;
const verifyToken = require("./middlewares/verifyToken");
const app = express();

app.use(cors()) ;
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
app.use('/api', verifyToken, MessageRouter);
app.use('/',GetUserRouter) ;

app.use('/messages',MessageMongoRouter) ;

app.use('/analytiques/messages', verifyToken, MessageAnaylitcsRouter) ;

app.listen(process.env.PORT, () => {
    console.log("Server is listening on port " + process.env.PORT);
});
