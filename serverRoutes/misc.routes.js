import express from "express";
import {citySearch} from "../serverControllers/citiesController.js";

export const miscRouter = express.Router();

miscRouter.get("/cities/search",citySearch)

