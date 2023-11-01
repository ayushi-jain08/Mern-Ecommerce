const express = require('express')
const app = express()
const cors = require('cors')
require('dotenv').config()
const ConnectDb = require('./Config/db')
const user = require('./Routes/UserRoute')
const bodyParser = require('body-parser');
const fileUpload  = require('express-fileupload')
const product = require('./Routes/ProductRoute')
const review = require("./Routes/Review")
const category = require("./Routes/Category")
const subCategory = require("./Routes/SubCategory")
const order = require('./Routes/Order')
const payment = require('./Routes/Payment')
const path = require('path')
const myMiddleware = (req, res, next) => {
    res.setHeader("Access-Control-Allow-Origin", "http://localhost:3000");
    res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type");
    next(); // Call next to pass control to the next middleware
};
const __dirnames = path.resolve();

ConnectDb()
app.use(bodyParser.json());
app.use(myMiddleware);
app.use(express.urlencoded({ extended: false }));
app.use(fileUpload({
    useTempFiles:true
}))
app.use(cors())
app.use(express.json())
app.use("/api", user)
app.use("/api",product )
app.use("/api", review)
app.use("/api", category)
app.use("/api", subCategory)
app.use("/api", payment)
app.use("/api", order)


app.use(express.static(path.join(__dirnames, '/frontend/dist')));

app.get('*', (req, res) => {
  res.sendFile(path.join(__dirname, 'frontend', 'dist', 'index.html'));
})
app.listen(process.env.PORT, () => {
    console.log("server start")
})