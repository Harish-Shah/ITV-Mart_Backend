let express = require("express");
let productRouter = require("./router/productRouter.js")
let userRouter = require("./router/userRouter.js")
let mongoose = require("mongoose")
let cors = require("cors");

let app = express();
app.use(express.json());
app.use(cors({
    origin:"http://localhost:5173"
}))
app.use(productRouter);
app.use(userRouter);

function connectMongo() {
    let url = "mongodb://localhost/e-commerce";
    mongoose.connect(url)
        .then(()=>{
            console.log("Connected to DB");
        }).catch((error)=>{
            console.log(error);
        })
}

app.listen(9000, ()=>{
    console.log("Server started");
    connectMongo();
})