require('dotenv').config();
const User = require('../models/User');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');

const {loginValidate, registerValidate} = require('./validate');

const userControler = {
    register: async function (req, res){

        const {error}  = registerValidate(req.body);
        if(error){return res.status(400).send(error)}

        const seletedUser = await User.findOne({email:req.body.email});
        if(seletedUser){
            return res.status(400).send("Email adress alredy exists.")
        }
        const user = new User({
            name: req.body.name,
            email: req.body.email,
            password: bcrypt.hashSync(req.body.password)
        });
        
        try{
            const savedUser = await user.save();
            res.send(savedUser);
        } catch(err) {
            res.status(400).send(err)
        }
    },

    login: async function (req, res){

        const {error}  = loginValidate(req.body);
        if(error){return res.status(400).send("Email or Password is invalid.")}

        const seletedUser = await User.findOne({email:req.body.email});
        if(!seletedUser){
            return res.status(400).send("Email or Password incorrect.")
        }

        const passwordAndUserMatch = bcrypt.compareSync(req.body.password, seletedUser.password);
        
        if(!passwordAndUserMatch){
            return res.status(400).send("Email or Password incorrect.");
        }else{
            // return res.send("Logged!");

            const token = jwt.sign({id:seletedUser.id, admin:seletedUser.admin}, process.env.TOKEN_SECRET)

            res.header('Authorization-token', token)
            return res.send("Logged!");
        };
    
    }
    
}

module.exports = userControler