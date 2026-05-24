import { Router } from "express";
import { addGradeLevel, getGradeLevels } from "../controllers/gradelevel.controller";

const adminRouter = Router();


//add grade level
adminRouter.post("/gradelevel", addGradeLevel);
adminRouter.get("/gradelevel", getGradeLevels);

export default adminRouter;