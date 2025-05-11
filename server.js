const express=require('express');
const errorHandler = require('./middleware/errorHandler');
const connectDB = require('./config/dbConnection');
const contactRoutes = require('./routes/contactRoutes');
const userRoutes = require('./routes/userRoutes');
const cors = require('cors');

connectDB();

const app=express();
app.use(cors());

const dotenv=require("dotenv").config();

const port = process.env.PORT||5000;

app.use(express.json());

app.use('/api/users', userRoutes);

app.use('/api/contact', contactRoutes);

app.use(errorHandler);

app.use((req, res, next) => {
    res.set('Cache-Control', 'no-store');
    next();
});

app.listen(port,()=>{
    console.log("server listining ${port}")
})