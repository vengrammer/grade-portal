import { Router } from "express";
import { addGradeLevel, getGradeLevels } from "../controllers/gradelevel.controller";
import { addSection, getSections } from "../controllers/section.controller";

const adminRouter = Router();


// Grade level
adminRouter.post("/gradelevel", addGradeLevel);
adminRouter.get("/gradelevel", getGradeLevels);

// Section
adminRouter.post("/section", addSection);
adminRouter.get("/section", getSections);

export default adminRouter;