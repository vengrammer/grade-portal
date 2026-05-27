import { Router } from "express";
import { addGradeLevel, getGradeLevels } from "../controllers/gradelevel.controller";
import { addSection, getSections } from "../controllers/section.controller";
import { addSubject, getSubjects } from "../controllers/subject.controller";


//validation middleware
import { sectionValidator } from "../middlewares/section.middleware";
import { validate } from "../middlewares/validate";
//kapag nag ka error sa express validator middleware hinde na sya pupunta sa loob ng controller mag return agad ng error

const adminRouter = Router();
// Grade level
adminRouter.post("/gradelevel", addGradeLevel);
adminRouter.get("/gradelevel", getGradeLevels);

// Section
adminRouter.post("/section", sectionValidator, validate, addSection);
adminRouter.get("/section", getSections);

//Subject
adminRouter.post("/subject", addSubject);
adminRouter.get("/subject", getSubjects);


export default adminRouter;