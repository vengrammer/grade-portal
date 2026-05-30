import { Router } from "express";
import { addGradeLevel, getGradeLevels } from "../controllers/gradelevel.controller";
import { addSection, getSections } from "../controllers/section.controller";
import { addSubject, getSubjects } from "../controllers/subject.controller";
import { getSchoolyears, addSchoolYear } from "../controllers/schoolYear.controller";
import { getGradingPeriods } from "../controllers/gradingPeriod.controller";
import { addAccount , getUsersByRole} from "../controllers/user.controller";
import {getAvailableStudentsForEnrollment} from "../controllers/enrollment.controller";

import { getGeneratedNumber } from "../controllers/user.controller";

//validation middleware
import { validate } from "../middlewares/validate";
import { sectionValidator } from "../middlewares/section.middleware";
import { validateAccountBeforeSave } from "../middlewares/user.middleware";
import { validateFindUserNotEnrolled } from "../middlewares/enrollment.middleware";
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

//School Year
adminRouter.post("/schoolyear", addSchoolYear);
adminRouter.get("/schoolyear", getSchoolyears);

//Grading Period
adminRouter.get("/gradingperiod", getGradingPeriods);

//account
adminRouter.post("/user", validateAccountBeforeSave, validate, addAccount);
adminRouter.get("/users", getUsersByRole);

//enrollment
adminRouter.get("/getnotenrolledstudents",validateFindUserNotEnrolled,  getAvailableStudentsForEnrollment);

//account number generator
adminRouter.get("/accountnumber", getGeneratedNumber);  


export default adminRouter;