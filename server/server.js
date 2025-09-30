
import dotenv from 'dotenv';
import connectDB from './config/db.js';
import { app } from "./app.js";

dotenv.config({
    path: '.env',
})
connectDB()
.then(() => {
    app.listen(process.env.PORT||8000, () => {
        console.log(`App is listening on port ${process.env.PORT || 8000}`);
    })
})       
.catch((error)=>{
    console.error("Error connecting to the database:", error);
})

