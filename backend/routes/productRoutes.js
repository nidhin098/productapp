const express = require('express');
const router = express.Router();
const productsData = require('../Models/productsData');
const jwt=require('jsonwebtoken')

router.use(express.json());
router.use(express.urlencoded({ extended: true }));

function verifyToken(req,res,next){  //middleware
    let token=req.headers.token;
    try{
        if(!token) throw 'Unauthorized Access'
        let payload=jwt.verify(token,"secret")
        if(!payload) throw 'Unauthorized Access'
        next()
    } catch(error){
        res.json({message:error})
    }
}


router.get('/', async (req, res) => {
    try {
        const data = await productsData.find();
        res.status(200).send(data);
    } catch (error) {
        console.error(error);
        res.status(500).send("Failed to fetch data");
    }
});


router.post("/add", verifyToken, async (req, res) => {
    try {
        const post = req.body;
        const data = new productsData(post);
        await data.save();
        res.status(200).send({ message: "Product added", products: data });
    } catch (error) {
        console.error(error);
        res.status(500).send("Failed to add product");
    }
});


router.delete("/delete/:id",verifyToken, async (req, res) => {
    try {
        const id = req.params.id;
        await productsData.findByIdAndDelete(id);
        res.status(200).send({ message: "Product removed" });
    } catch (error) {
        console.error(error);
        res.status(500).send("Failed to delete product");
    }
});
router.post('/update/:id',verifyToken,async(req,res)=>{
    try{
        await productsData.findByIdAndUpdate(req.params.id,req.body)
        res.redirect('/product')
    } catch(err){
        res.status(500).send(err.message)
    }
})

module.exports = router;
