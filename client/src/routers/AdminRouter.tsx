import {Routes, Route} from "react-router-dom";
import { Navigate } from "react-router-dom";

import AdminLayout from "../layout/AdminLayout";
import AdminDashboard from "../components/admin/AdminDashboard";
import GradeLevels from "../components/admin/GradeLevels";
import Sections from "../components/admin/Sections";
import Subjects from "../components/admin/Subjects";
import Schoolyears from "../components/admin/SchoolYears";
import GradingPeriod from "../components/admin/GradingPeriod";
import Teachers from "../components/admin/Teachers";
import Students from "../components/admin/Students";
function AdminRouter() {
    return (
        <Routes >
            <Route element={<AdminLayout />}>
                <Route path="/" element={<Navigate to="/admin/dashboard" replace/>} />
                <Route path="dashboard" element={<AdminDashboard/>} />

                <Route path="teachers" element={<Teachers/>} />
                <Route path="students" element={<Students/>} />

                <Route path="gradelevels" element={<GradeLevels/>} />
                <Route path="sections" element={<Sections/>} />
                <Route path="subjects" element={<Subjects/>} />
                <Route path="gradingperiods" element={<GradingPeriod/>} />
                <Route path="schoolyears" element={<Schoolyears/>} />
            </Route>
            <Route path="*" element={<Navigate to="/admin/dashboard" replace/>} />
        </Routes>
    );
}

export default AdminRouter;