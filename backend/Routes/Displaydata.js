const express = require('express')
const router = express.Router();


router.post("/fooddata",(req,res)=>{
    try {
        res.send([global.food_items,global.foodcategory])
    } catch (error) {
        console.error(error.message);
        res.status(500).send("Server Error");
    }

})

module.exports = router;