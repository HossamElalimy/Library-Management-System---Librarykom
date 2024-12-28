import express, {Express,Request,Response} from 'express';
import cors from 'cors';
import { config } from './config';
import mongoose from 'mongoose';

const PORT=config.server.port;

const app:Express=express();

app.use(express.json());
app.use(cors());

(async function startUp(){
    try {
        await mongoose.connect(config.mongo.url, {w:"majority",retryWrites:true,authMechanism:"DEFAULT"});
        
        console.log("Connection to MongoDB successfully made");

        app.get("/health",(req:Request,res:Response)=>{
            res.status(200).json({message:"Server is running properly"});
        })
        
        app.listen(PORT,()=>{
            console.log(`Server is listening on Port ${PORT}`);
        })
    } catch (error) {
        console.log("Couldn't make a connection to the database");
    }
})();

