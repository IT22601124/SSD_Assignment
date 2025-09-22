const router = require("express").Router();
const BuyerReq = require("../models/BuyerReq");

//Save Buyer Request
router.route('/add').post(async(req, res)=>{
    const {userID, productsList, createdAt, status, total, uName, uAddress, uProvince, uZipCode, uPhone, delivery} = req.body;

    try{
        const newBuyerReq = new BuyerReq({userID, productsList, createdAt, status, total, uName, uAddress, uProvince, uZipCode, uPhone, delivery
        });
        console.log(newBuyerReq);
        const result = await newBuyerReq.save();
        if(result)
            res.status(201).send("Data added successfully !");
        else
            res.status(500).send("Server Error !");
    }
    catch(err){
        console.log(err);
        res.status(500).send("Server Error !");
    }
});


//Get All Buyer Requsts
router.route('/').get((req, res)=>{
    BuyerReq.find()
    .then((buyerReq)=>{
        res.status(200).json(buyerReq);
    })
    .catch((err)=>{
        console.log(err);
    })
});


//Get User Specific Buyer Requests
router.route('/:id').get((req, res)=>{
    const {id} = req.params;
    BuyerReq.find({userID: id})
    .then((buyerReq)=>{
        res.status(200).json(buyerReq);
    })
    .catch((err)=>{
        console.log(err);
    })
});


//Approve or Reject Reqest
router.route('/update/:id').patch((req, res)=>{
    const {id} = req.params;
    const {status} = req.body;
    const updatedReq = {status};

    BuyerReq.findByIdAndUpdate(id, updatedReq)
    .then(()=>{
        res.status(200).send('Status updated');
    })
    .catch((err)=>{
        res.status(500).send('Status Update Failed');
        console.log(err);
    })
});


module.exports = router;