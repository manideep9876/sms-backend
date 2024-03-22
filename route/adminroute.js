const express = require('express');
const adminmodel = require('../MODEL/admin model.js')
const route = express.Router();

const cors =require('cors');


let corsOptions = {
    origin: ['http://localhost:5000']
}

route.post('/addadmin', cors(corsOptions), (req, res) => {
    const mr = new adminmodel(req.body);
    mr.save();
    res.status(201).json(mr)
})

route.post('/login', cors(corsOptions), async (req, res)=>{
    const adminlogin = await adminmodel.findOne(req.body);
    if(adminlogin){
        res.status(201).json(adminlogin);
    } else{
        res.status(500).json('Login Failed')
    }
})
module.exports = route