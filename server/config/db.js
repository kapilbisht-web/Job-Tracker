import mongoose from "mongoose";

import {DB_NAME} from '../constant.js';

const connectDB= async()=>{
    try{
       const connectInstance= await mongoose.connect(`${process.env.MONGO_URI}/${DB_NAME}`)
         console.log(`MongoDB connected: ${connectInstance.connection.host}`);
    } 
    catch(error){
        console.error(`Error: ${error.message}`);
        process.exit(1);
    }
}
export  default connectDB