let user = require("../models/userModel");
let bcrypt = require("bcrypt");
let jwt = require("jsonwebtoken");
const userModel = require("../models/userModel");


let getUser = async (req, resp) => {
    let dbUser = await user.findOne({ id: req.params.id }, { _id: 0, password: 0, __v: 0 });

    if (dbUser) {
        resp.status(200).send(dbUser);
    } else {
        resp.status(404).send("User not found");
    }
}

let registerUser = async (req, resp) => {

    let dbUser = await user.findOne({ id: req.body.id });

    if (dbUser) {
        resp.send("User already present!");
    } else {
        let u = req.body;

        // encrypting password
        u.password = await bcrypt.hash(u.password, 10);
        await user.create(u);

        // generating jwt token
        let token = jwt.sign({ id: u.id, role: u.role }, "NodejsRest", { expiresIn: "10h" })
        // resp.status(201).send({token: token})
        resp.status(201).send(await user.findOne({ id: req.body.id }))
    }
}

let userLogin = async (req, resp) => {
    let dbUser = await user.findOne({ id: req.body.id });
    let u = req.body;

    if (dbUser) {
        let isValidUser = await bcrypt.compare(u.password, dbUser.password);
        if (isValidUser) {
            // generating jwt token
            let token = jwt.sign({ id: dbUser.id, role: dbUser.role }, "NodejsRest", { expiresIn: "10h" })
            resp.status(201).send({
                id: dbUser.id,
                username: dbUser.username,
                role: dbUser.role,
                cart: dbUser.cart,
                products: dbUser.products,
                token: token
            });
        } else {
            resp.status(401).send("User not authenticated! Please check your credeantials");
        }
    } else {
        resp.status(404).send("User not found!");
    }

}

let updateUser = async (req, resp) => {

    let dbUser = await userModel.findOne({ id: req.params.id })
    if (dbUser) {

        try {
            await userModel.updateOne({ id: req.params.id }, { $set: req.body });
            resp.status(200).send("User updated");
        } catch (error) {
            console.log(error);
            resp.status(500).send("Something went wrong");
        }

    } else {
        resp.status(404).send("User not found with id: ", req.params.id)
    }

}

let verifyUserAndAdmin = (req, resp, next) => {


    if (req.headers["authorization"]) {

        try {
            let token = req.headers["authorization"].split(" ")[1];
            let jwtData = jwt.verify(token, "NodejsRest");
            if (jwtData && (jwtData.role == "USER") || jwtData.role == "ADMIN") {
                next();
            } else {
                resp.status(401).send("Not authenticated");
            }
        } catch (error) {
            resp.send("Token is not valid");
        }
    } else {
        resp.send("Token is not given");
    }

}

let verifyAdmin = (req, resp, next) => {

    if (req.headers["authorization"]) {
        try {
            let token = req.headers["authorization"].split(" ")[1];
            let jwtData = jwt.verify(token, "NodejsRest");
            if (jwtData && (jwtData.role == "ADMIN")) {
                next();
            } else {
                resp.status(401).send("Not authenticated");
            }
        } catch (error) {
            resp.send("Token is not valid");
        }
    } else {
        resp.send("Token is not given");
    }

}

module.exports = { registerUser, userLogin, verifyAdmin, verifyUserAndAdmin, updateUser, getUser }