const router = require("express").Router();
const Product = require("../models/Product");

//Add new product
router.route("/add").post(async(req, res) => {
    //Desctucture the request body and get product details
    const {name, description, price, quantity, category, subCategory, mfd, exp, weight, sellerID, imageLink} = req.body;
    const createdAt = new Date();

    try{
        //Create a product details object and initilize above variables
        let product = new Product({name, description, price, quantity, category, subCategory, mfd, exp, weight, sellerID, imageLink, createdAt});
        const result = await product.save();
 
        if(result)
            res.status(201).send("Data added successfully !");
        else
            res.status(500).send("Server Error !");
    }
    catch(error){
        console.log(error);
        res.status(500).send("Server Error !");
    }
});




//Get all products
router.route('/get').get((req, res) =>{
    Product.find().then((products)=>{
        res.status(200).json(products);
    }).catch((err)=>{
        console.log(err);
    })
});




//Get one product
router.route('/getOne/:id').get((req, res) => {
    const id = req.params.id;
    Product.findById(id).then((product) => {
        if(product)
            res.status(200).json(product);
        else
            res.status(400).send('Not found !');

    }).catch((err) => {
        res.status(500).send('Server Error !')
        console.log(err);
    })
});




//Update product
router.route("/update/:id").patch(async (req, res) => {
    const id = req.params.id;
    const {name, description, price, quantity, category, subCategory, mfd, exp, weight, sellerID, imageLink} = req.body;
    let updatedProduct = {name, description, price, quantity, category, subCategory, mfd, exp, weight, sellerID, imageLink};
    await Product.findByIdAndUpdate(id, updatedProduct) 
    .then(() => {
        res.status(200).send("Product Updated");
    }).catch((err) => {
        console.log(err);   
        res.send(500).send("Update Failed");
    })
});




//Delete product
router.route("/delete/:id").delete(async (req, res) => {
    const id = req.params.id;
    await Product.findByIdAndDelete(id)
    .then(() => {
        res.status(200).send("Product Deleted");
    }).catch((err) => {
        console.log(err);
        res.status(500).send("Delete Failed");
    })
});




//Get product by category
router.route('/category/:category').get((req, res)=>{
    const {category} = req.params;

    Product.find({category: category})
    .then((products)=>{
        if(products)
            res.status(200).json(products);
        else
            res.status(400).send('Not found !');
    })
    .catch((err)=>{
        console.log(err);
        res.status(500).send('Server Error !');
    })
});




//Get Products by Seller
router.route('/seller/:id').get((req, res)=>{
    const {id} = req.params;

    Product.find({sellerID: id})
    .then((products)=>{
        if(products)
            res.status(200).json(products);
        else
            res.status(400).send('Not found !');
    })
    .catch((err)=>{
        console.log(err);
        res.status(500).send('Server Error !');
    })
});




//Serach Product




module.exports = router;