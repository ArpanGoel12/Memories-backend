
import express from 'express';
import bodyParser from 'body-parser';
import mongoose from 'mongoose';
import cors from 'cors';

import postRoutes from './routes/posts.js';

const app = express();
app.use(express.json());
app.use(bodyParser.json({ limit: '30mb', extended: true }))
app.use(bodyParser.urlencoded({ limit: '30mb', extended: true }))


const connectnetwork=async()=>{
  try{
      
      mongoose.set("strictQuery", false);
await mongoose.connect("mongodb+srv://arpan:Awesome12@cluster0.zcaikrp.mongodb.net/?retryWrites=true&w=majority",);
console.log("connected");
}
  catch(error){
console.log(error);
  }
};
mongoose.connection.on("disconnected",()=>{
  console.log("discconected");
});
app.use(cors());
app.use(function(req,res,next){
  res.header("Access-Control-Allow-Origin","*");
  res.header(
      "Access-Control-Allow-Headers",
      "Origin,XX-Resquested-With, Content-Type,Accept,Authorization"
  );
  res.header('Access-Control-Allow-Methods' , 'GET,PUT,PATCH,POST,DELETE,OPTIONS');
  next();
});
app.use('/posts', postRoutes);
app.listen(4000,()=>{
  connectnetwork();
  console.log("connection sucessful");
});