import axios from "axios";
import express from "express";
import bodyParser  from "body-parser";
import dotenv from "dotenv";

dotenv.config();

const app = new express();

app.use(bodyParser.json());

const PORT = process.env.PORT;

app.listen(PORT,()=>{
    console.log(`server listening on PORT: ${PORT}`)
})