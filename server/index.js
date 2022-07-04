const express = require("express");
const app = express();
const PORT = process.env.PORT;

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

app.listen(PORT, () => {
    console.log("Server is listening on port " + PORT);
});