import express from "express";
import mongoose from "mongoose";
import Linkmodel from "../models/link.mongoose.js";
import dotenv from "dotenv"
dotenv.config();

const app = express();
app.use(express.json());


mongoose.connect(process.env.MONGO_DB).then(()=>{
    console.log("MongoDb connected");
    
}).catch((error) => console.log("MongoDB error",error)
)




app.post("/add",async (req,res)=>{
    try {
        const {id, link} = req.body;
        const newLink = new Linkmodel({id,link});
        await newLink.save();
        res.status(201).json({message : "Link saved successfully"})
    } catch (error) {
        res.status(500).json({message : "Error saving Link",error})
        
    }
})



app.get("/links/:id",async (req,res) => {
    try {
        const id = req.params.id;
        const link = await Linkmodel.findOne({id});
        if(!link){
            return res.status(404).json({error : "LINK is not found"})
        }

        res.status(200).json(link);
    } catch (error) {
        res.status(500).json({error : "Failed to fetch link"})
    }
})




app.delete("/delete/:id",async (req,res) => {
    try {
        const result = await Linkmodel.findOneAndDelete({id : req.params.id});
        if(result){
            res.status(200).json({message : "Link deleted Successfuly"});
        }else{
            res.status(404).json({error  : "LINK is not found" });
        }
    } catch (error) {
        res.status(500).json({error : "Failed to delete link"})
    }
});



app.listen(5000,()=>{
    console.log("Server is running on port 5000");
    
})