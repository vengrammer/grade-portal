import {Routes, Route} from "react-router-dom";
import { Navigate } from "react-router-dom";

import TeacherLayout from "../layout/TeacherLayout";
import TeacherDashboard from "../components/teacher/TeacherDashboard";

function TeacherRouter() {
    return (
        <Routes >
            <Route element={<TeacherLayout />}>
                <Route path="/" element={<Navigate to="/teacher/dashboard" replace/>} />
                <Route path="dashboard" element={<TeacherDashboard/>} />
            </Route>
            <Route path="*" element={<Navigate to="/teacher/dashboard" replace/>} />
        </Routes>
    );
}

export default TeacherRouter;