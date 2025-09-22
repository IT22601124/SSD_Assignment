const router = require("express").Router();
const Cart = require("../models/Cart");

//Add Item To Cart
router.route('/add').post(async(req, res)=>{
    const {userID, productID, productName, price, image} = req.body;

    try{
        const newCart = new Cart({userID, productID, productName, price, image});
        const result = await newCart.save();
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


//Remove Item From Cart
router.route('/delete/:id').delete(async(req, res)=>{
    const {id} = req.params;

    await Cart.findByIdAndDelete(id)
    .then(()=>{
        res.status(200).send("Cart Item Deleted");
    }).catch((err) => {
        console.log(err);
        res.status(500).send("Delete Failed");
    })
});


//Get Items Specified to perticular user
router.route('/get/:id').get((req, res)=>{
    const {id} = req.params;

    Cart.find({userID: id}).then((items) => {
        res.status(200).json(items);
    }).catch((err) => {
        console.log(err);
        res.status(400).send('No Items Found');
    })
});

module.exports = router;