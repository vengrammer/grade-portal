import { Routes, Route } from "react-router-dom";
import { Navigate } from "react-router-dom";

import TeacherLayout from "../layout/TeacherLayout";
import TeacherDashboard from "../components/teacher/TeacherDashboard";
import TeacherClasses from "../components/teacher/TeacherClasses";
import EncodeGrades from "../components/teacher/EncodeGrades";
import SubmittedGrades from "../components/teacher/SubmittedGrades";

function TeacherRouter() {
    return (
        <Routes >
            <Route element={<TeacherLayout />}>
                <Route path="/" element={<Navigate to="/teacher/dashboard" replace />} />
                <Route path="dashboard" element={<TeacherDashboard />} />
                <Route path="teacherClass" element={<TeacherClasses />} />
                <Route path="encodeGrades" element={<EncodeGrades />} />
                <Route path="submittedGrades" element={<SubmittedGrades />} />
            </Route>
            <Route path="*" element={<Navigate to="/teacher/dashboard" replace />} />
        </Routes>
    );
}

export default TeacherRouter;