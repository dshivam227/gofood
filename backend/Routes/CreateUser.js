const express = require('express')
const router = express.Router();
const user = require('../models/User')
const { body, validationResult } = require('express-validator');

const bcrypt=require('bcryptjs')
const jwt= require('jsonwebtoken')
const jwtsecret= "iamshivamdubeyfromkhalilabad"

router.get('/ok', (req, res) => {
    console.log('ok connnected');

    res.send('Hello World123 ');
})
//create user
router.post('/createuser', [body('email').isEmail(), body('password').isLength({ min: 5 })], async (req, res) => {

    const errors = validationResult(req);
    if (!errors.isEmpty()) {
        return res.status(400).json({ errors: errors.array() });
    }

    const salt= await bcrypt.genSalt(10);
    const genpassword= await bcrypt.hash(req.body.password,salt);

    try {
        await user.create({
            name: req.body.name,
            email: req.body.email,
            password: genpassword,
            location: req.body.location,
            // role: req.body.role

        })

        res.json('User created');

    } catch (error) {
        // res.send(error)
    }
})

//login 
router.post('/loginuser', async (req, res) => {
        let email= req.body.email;
        let password= req.body.password;
   
    try {
        let userdata=await user.findOne({email})
        const pwdcompare= await bcrypt.compare(req.body.password,userdata.password)

        const data={
            user:userdata.id
        }
        const authtoken=jwt.sign(data,jwtsecret) 
        if(pwdcompare ){
          
           return res.json({success:true,authtoken:authtoken});
        }
        else{
            res.json('Login Failed')
        }


    } catch (error) {
        // res.send(error)
    }
})

module.exports = router;

