const express = require('express');
const app = express();

app.use("/test", (req, res,next) => {
    console.log("Hello from the server, I am here after 1st router");
    next();
},(req, res,next) => {
    console.log("Hello from the server, I am here after 2st router");
    next();
},(req, res,next) => {
    console.log("Hello from the server, I am here after 3st router");
    next();
},(req, res,next) => {
    console.log("Hello from the server, I am here after 4st router");
    res.send("Response4!!!")
});

app.listen(7777, () => {
    console.log("Server is successfully listening on port 7777");
});

