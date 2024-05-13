import express from "express";
import bodyParser from "body-parser";
import dotenv from "dotenv";
import { jobRouter } from "./serverRoutes/jobRouter.routes.js";
import { resumeRouter } from "./serverRoutes/resume.routes.js";
import { jobAlertsRouter } from "./serverRoutes/jobAlerts.routes.js";
import cors from "cors";
import logger from "morgan";
import mongoose from "mongoose";

dotenv.config();

const app = new express();

app.use(logger("combined"));

app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());

app.use(cors());

// connect to mongoDB
const uri = process.env.MONGODB_URI;
mongoose.connect(uri);
const db = mongoose.connection;
db.on("connected", () => {
  console.log("Connected to MongoDB");
});
db.on("error", (error) => {
  console.log(`MongoDB connection error: ${error}`);
});

app.get("/", (req, res) => {
  res.send("hi");
});

app.use("/api/job", jobRouter);
app.use("/api/resume", resumeRouter);
app.use("/api/job-alerts", jobAlertsRouter);

const PORT = process.env.PORT;

app.listen(PORT, () => {
  console.log(`server listening on PORT: ${PORT}`);
});
