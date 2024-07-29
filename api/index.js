
import connectDB from './DB/index.js';
import app from './app.js';
import dotenv from 'dotenv';

dotenv.config({ path: "./.env" });

try {
 connectDB();
    app.listen(process.env.PORT || 8080,()=>{
        console.log(`Server is running on port ${process.env.PORT}`)
    });
} 
catch (err) {
    console.log("Server error",err);
}


