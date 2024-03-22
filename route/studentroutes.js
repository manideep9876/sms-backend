const express = require('express');
const cors = require('cors')
const studentmodel = require('../MODEL/studentmodel.js');

const route = express.Router();


let corsOptions = {
    origin: ['http://localhost:5000']
}

route.post('/addstudent', cors(corsOptions), (req, res) => {
    const n = new studentmodel(req.body);
    n.save();
    res.status(201).json(n)

})
route.get('/studentslist', cors(corsOptions), async (req, res) => {
    try {
        const studentslist = await studentmodel.find();
        res.status(201).json(studentslist);
    } catch (error) {
        console.log(error);
        res.status(500).json({ message: 'internal server not found' })
    }


})
route.put('/updatestudents/:id', cors(corsOptions), async (req, res) => {
    const updatestudents = await studentmodel.findByIdAndUpdate(req.params.id, { $set: req.body }, { new: true });
    res.status(201).json(updatestudents)
});
route.delete('/deletestudents/:id', cors(corsOptions), async (req, res) => {
    const deletestudents = await studentmodel.findByIdAndDelete(req.params.id)
    res.status(201).json(deletestudents)
})


module.exports = route
