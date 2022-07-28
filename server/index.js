const express = require("express");
const UserRouter = require("./routes/user");
const FriendsRouter = require("./routes/friends");
const GetUserRouter = require('./routes/getUser') ;
const SecurityRouter = require("./routes/security");
const MessageRouter = require('./routes/message') ;
const MessageMongoRouter = require('./routes/messageMongo') ;
const MessageAnaylitcsRouter = require('./routes/messageAnalytiques') ;
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
app.use('/api', verifyToken, MessageRouter);
app.use('/api', verifyToken, FriendsRouter);
app.use('/',GetUserRouter) ;

app.use('/messages',MessageMongoRouter) ;

app.use('/analytiques/messages', MessageAnaylitcsRouter) ;

app.listen(process.env.PORT, () => {
    console.log("Server is listening on port " + process.env.PORT);
});
