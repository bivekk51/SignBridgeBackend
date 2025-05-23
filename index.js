const express=require('express')

const app=express()



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

const userRoutes = require('./routes/userRoutes');
app.use('/api/users', userRoutes);


//signRoutes haru 

const signRoutes=require('./routes/signRoutes')
app.use('/api/signs',signRoutes)
//PDF ko routes haru 
const pdfRoutes = require('./routes/pdfRoutes');
app.use('/api/pdfs', pdfRoutes);

//signWords ko routes haru 

const signwordRoutes=require('./routes/signwordRoutes')
app.use('/api/signwords',signwordRoutes)
//App chalyo
const PORT=process.env.PORT
app.listen(PORT, () => {
    console.log('Server running on port',PORT);
  });
  