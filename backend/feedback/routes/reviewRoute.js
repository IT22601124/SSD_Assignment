const router = require("express").Router();
const Product = require("../models/reviewModel");

//Add new review
// router.route("/add").post(async(req, res) => {
//     //Desctucture the request body and get product details
//     const {name, description, price, quantity, category, subCategory, mfd, exp, weight, sellerID, imageLink} = req.body;
//     const createdAt = new Date();

//     try{
//         //Create a product details object and initilize above variables
//         let product = new Product({name, description, price, quantity, category, subCategory, mfd, exp, weight, sellerID, imageLink, createdAt});
//         const result = await product.save();
 
//         if(result)
//             res.status(201).send("Data added successfully !");
//         else
//             res.status(500).send("Server Error !");
//     }
//     catch(error){
//         console.log(error);
//         res.status(500).send("Server Error !");
//     }
// });