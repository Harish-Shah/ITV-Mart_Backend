let express = require("express");
let router = express.Router();
let {getProducts, saveProduct, deleteProduct, updatedProduct} = require("../controller/productsController.js");
const { verifyUserAndAdmin, verifyAdmin } = require("../controller/userController.js");

router.get("/products", getProducts)

router.post("/products", verifyAdmin, saveProduct)

router.delete("/products/:id", verifyAdmin, deleteProduct)

router.put("/products/:id", verifyUserAndAdmin,  updatedProduct)

module.exports = router;
