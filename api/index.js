const express = require('express');
const app = express();
const cors = require('cors');
const mongoose = require('mongoose');
const userRoutes = require('./routes/user');
const noteRoutes = require('./routes/note');
mongoose.connect("mongodb://127.0.0.1:27017/WebTest").
then(()=>{
    console.log("Database Connected");
}).catch((err)=>{
    console.log(err);
})
app.use(cors());
app.use(express.json());
app.use("/user",userRoutes);
app.use("/note",noteRoutes);
app.get('/', (req,res)=>{
    res.send("Hello World");
})

app.listen(5000)