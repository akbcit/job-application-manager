import express from "express";
import bodyParser  from "body-parser";
import dotenv from "dotenv";
import { receiverRouter } from "./serverRoutes/receiverRouter.route.js";
import cors from 'cors';
import logger from "morgan";


dotenv.config();

const app = new express();

app.use(logger('combined'));

app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());

app.use(cors());

app.get("/",(req,res)=>{
    res.send("hi");
});

app.use("/api/summary",receiverRouter);

const PORT = process.env.PORT;

app.listen(PORT,()=>{
    console.log(`server listening on PORT: ${PORT}`)
})