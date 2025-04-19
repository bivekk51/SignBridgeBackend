const express=require('express')

const app=express()
const PORT=3000


//db config import
require('dotenv').config();
const {connecttoMongo}=require('./configs/db')
const mongoUrl=process.env.Mongo_DB_URL
connecttoMongo(mongoUrl)

//middleware 
app.use(express.json())
app.use(express.urlencoded({ extended: true }));

//CORS 
const cors=require('cors')
app.use(cors())

//Setting up Auth  routes 

const authRoutes = require('./routes/AuthRoutes');
app.use('/api/auth', authRoutes);


//PDF ko routes haru 
const pdfRoutes = require('./routes/pdfRoutes');
app.use('/api/pdfs', pdfRoutes);

//App chalyo
app.listen(PORT,()=>{
    console.log(`App running in http://localhost:${PORT}`)
})
