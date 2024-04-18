const express = require('express');
const mongoose = require('mongoose');


const studentroute = require('./route/studentroutes.js')
const adminroute = require('./route/adminroute.js')


const app = express();
app.use(express.json());



const cors = require('cors')

app.use(cors())
let corsOptions = {
    origin: ['http://localhost:5000']

}

const port = 5000;
url = 'mongodb://localhost:27017/student'

app.listen(port, () => {
    console.log('server is running on port', port);
});

mongoose.connect(url).then(
    console.log("database connected")
).catch(err => {
    console.log("database not connected")
});


app.use('/students', cors(corsOptions), studentroute)
app.use('/admin', cors(corsOptions), adminroute)