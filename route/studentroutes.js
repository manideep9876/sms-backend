const express = require('express');
const cors = require('cors')
const studentmodel = require('../MODEL/studentmodel.js');
const multer=require('multer');
const route = express.Router();

const storage=multer.diskStorage({destination:"uploads/",filename:(req,uploadphoto,cb)=>{
    cb(null,uploadphoto.originalname);
},

})
const uploads=multer({storage});
let corsOptions = {
    origin: ['http://localhost:5000']
}
route.post("/register",cors(corsOptions),uploads.single("uploadphoto"),async(req,res)=>{
    if (!req.file){
        return res.status(400).json({error:"no image"})

    }
    var data={
        fullname:req.body.fullname,
        fathername:req.body.fathername,
        class:req.body.class,
        mobileno:req.body.mobileno,
        place:req.body.place,
        dob:req.body.dob,
        section:req.body.section,
        uploadphoto:req.file.filename
    }
    try{
        const image=await studentmodel(data)
        image.save();
        return res.status(200).json(image)
    }catch(err){
        return res.status(500).json({err})
    }
})
// file upload

// route.post('/addstudent', cors(corsOptions), (req, res) => {
//     const n = new studentmodel(req.body);
//     n.save();
//     res.status(201).json(n)

// })

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
