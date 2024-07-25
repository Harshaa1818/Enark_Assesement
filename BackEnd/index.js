
import connectDB from './DB/index.js';
import app from './app.js';
import dotenv from 'dotenv';

dotenv.config({ path: "./.env" });

try {
    await connectDB();
    app.listen(process.env.PORT,()=>{
        console.log(`Server is running on port ${process.env.PORT}`)
    });
} 
catch (err) {
    console.log("Server error",err);
}
