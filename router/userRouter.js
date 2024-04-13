let express = require("express");
let {registerUser, userLogin, updateUser, verifyUserAndAdmin, getUser} = require("../controller/userController"); 

let router = express.Router();

router.post("/user/register", registerUser);

router.get("/user/:id", verifyUserAndAdmin, getUser);

router.post("/user/login", userLogin);

router.put("/user/update/:id",verifyUserAndAdmin, updateUser);

module.exports = router;