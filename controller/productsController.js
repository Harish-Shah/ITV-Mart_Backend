let product = require("../models/productModel")

// let products = [
//     {
//         id:1,
//         name:"TShirt",
//         brand:"Polo",
//         price:300,
//         quantity:4
//     },
//     {
//         id:2,
//         name:"Shirt",
//         brand:"Zudio",
//         price:300,
//         quantity:2
//     },
//     {
//         id:3,
//         name:"Shoes",
//         brand:"Nike",
//         price:2000,
//         quantity:5
//     }
// ]

let getProducts = async (req, resp)=>{
    // resp.status(200).send(products);

    let page = req.query.page;
    let limit = req.query.limit;

    if(page==undefined || page==null) {
        page=1;
    }

    if(limit==undefined || limit==null) {
        limit = 8;
    }

    let skip = (page-1)*limit;

    try {
        let products = await product.find({}).limit(limit).skip(skip);
        resp.status(200).send(products);
    } catch(error) {
        console.log(error);
        resp.status(500).send("Something went wrong!");
    }
}

let saveProduct = async (req, resp)=>{
    let productData = req.body;

    try {
        await product.create(productData);
        resp.status(201).send(await product.find({}));
    } catch(error) {
        console.log(error);
        resp.status(500).send("Something went wrong!");
    }

    // products.push(product)
  
}

let deleteProduct = async (req, resp)=>{
    
    // products = products.filter((product)=>{
    //     return product.id!=req.params.id;
    // })

    // resp.status(200).send(products);

    let prod = await product.findOne({id:req.params.id});
    if(prod) {
        try {
            await product.deleteOne({id:req.params.id})
            resp.status(200).send(await product.find({}));
        } catch(error) {
            resp.status(500).send("Something went wrong");
        }
    } else {
        resp.status(404).send("Product not found!");
    }
   

}

let updatedProduct = async  (req, resp)=>{

    // let updatedProduct = req.body; 

    // products = products.map((product)=>{
    //     if(product.id==updatedProduct.id) {
    //         product.name = updatedProduct.name;
    //         product.brand = updatedProduct.brand;
    //         product.price = updatedProduct.price;
    //         product.quantity = updatedProduct.quantity;
    //     }
    //     return product;
    // })

    // resp.status(200).send(products);

    let prod = await product.findOne({id:req.params.id});
    if(prod) {

        try {
            await product.updateOne({id:req.params.id}, {$set:req.body})
            resp.status(200).send(await product.find({id:req.params.id}));
        } catch(error) {
            resp.status(500).send("Something went wrong");
        }
        
    } else {
        resp.status(404).send("Product not found!");
    }


}

module.exports = {getProducts, saveProduct, deleteProduct, updatedProduct}