
import { Routes, Route, Navigate } from "react-router-dom";
import Profile from "../components/student/Profile";
import StudentLayout from "../layout/StudentLayout";
import Grades from "../components/student/Grades";

function StudentRouter() {
    
    return (
        <Routes >
            <Route element={<StudentLayout />}>
                <Route path="/" element={<Navigate to="/student/profile" replace/>} />
                <Route path="profile" element={<Profile/>} />
                <Route path="grade" element={<Grades/>} />
            </Route>
            <Route path="*" element={<Navigate to="/student/profile" replace/>} />
        </Routes>
    )
}
export default StudentRouter;