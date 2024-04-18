const express = require('express');
const adminmodel = require('../MODEL/admin model.js')
const route = express.Router();
const jwt = require('jsonwebtoken')
const cors = require('cors');
const verifyToken = require('./jwt/token.js')

let corsOptions = {
    origin: ['http://localhost:5000']
}

route.post('/addadmin', cors(corsOptions), (req, res) => {
    const mr = new adminmodel(req.body);
    mr.save();
    res.status(201).json(mr) 
})

route.post('/login', cors(corsOptions), async (req, res) => {
    const adminlogin = await adminmodel.findOne(req.body);
    if (adminlogin) {
        res.status(201).json(adminlogin);
    } else {
        res.status(500).json('Login Failed')
    }
})
route.post("/userlogin", async (req, res) => {
    try {
        const user = await userModel.findOne({ "fullname": req.bodyfullname, "mobileno": req.body.mobileno })
        if (!user) {
            res.status(404).json('user not found')
        }
        const secretkey = 'my secretkey';
        const token = jwt.sign({ "fullname": req.body.fullname, "mobileno": req.body.mobileno }, secretkey, { expiresIn: '1h' })
        res.status(201).json({ user, token })
    } catch (err) {
        res.status(500).json({ err: 'user login failed' })
    }



})
module.exports = route