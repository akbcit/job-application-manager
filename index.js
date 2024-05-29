import express from "express";
import bodyParser from "body-parser";
import dotenv from "dotenv";
import cors from "cors";
import logger from "morgan";
import mongoose from "mongoose";
import session from "express-session";
import connectMongo from "connect-mongo";
import { jobRouter } from "./serverRoutes/jobRouter.routes.js";
import { resumeRouter } from "./serverRoutes/resume.routes.js";
import { jobAlertsRouter } from "./serverRoutes/jobAlerts.routes.js";
import { authRouter } from "./serverRoutes/auth.routes.js";
import { candidateRouter } from "./serverRoutes/candidate.routes.js";
import cookieParser from "cookie-parser";  
import {miscRouter} from "./serverRoutes/misc.routes.js";
import {connectMongoDb} from "./data/db/connect/connectMongoDb.js";


dotenv.config();

const app = express();

await connectMongoDb();

// Configure session middleware
const uri = process.env.MONGODB_URI;
app.use(
  session({
    secret: process.env.SESSION_SECRET,
    resave: false,
    saveUninitialized: false,
    store: connectMongo.create({
      mongoUrl: uri,
      collectionName: "Sessions",
      ttl: 14 * 24 * 60 * 60, // 14 days
    }),
    cookie: {
      maxAge: 14 * 24 * 60 * 60 * 1000, // 14 days
    },
  })
);

app.use(logger("combined"));


app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());
app.use(cookieParser());
app.use(cors());

app.get("/", (req, res) => {
  res.send("hi");
});

app.use("/api/job", jobRouter);
app.use("/api/resume", resumeRouter);
app.use("/api/jobAlerts", jobAlertsRouter);
app.use("/api/auth", authRouter);
app.use("/api/candidate", candidateRouter);
app.use("/api/misc",miscRouter);

const PORT = process.env.PORT || 3000;

app.listen(PORT, () => {
  console.log(`Server listening on PORT: ${PORT}`);
});

