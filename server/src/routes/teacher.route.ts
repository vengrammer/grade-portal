import {Router} from "express";
import {getAllTeachingClasses} from "../controllers/teachingClass.controller";

const teacherRouter = Router();

teacherRouter.get("/teaching-classes", getAllTeachingClasses);

export default teacherRouter;