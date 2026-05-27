import {Routes, Route} from "react-router-dom";
import { Navigate } from "react-router-dom";

import AdminLayout from "../layout/AdminLayout";
import AdminDashboard from "../components/admin/AdminDashboard";
import GradeLevels from "../components/admin/GradeLevels";
import Sections from "../components/admin/Sections";
import Subjects from "../components/admin/Subjects";

function AdminRouter() {
    return (
        <Routes >
            <Route element={<AdminLayout />}>
                <Route path="/" element={<Navigate to="/admin/dashboard" replace/>} />
                <Route path="dashboard" element={<AdminDashboard/>} />
                <Route path="gradelevels" element={<GradeLevels/>} />
                <Route path="sections" element={<Sections/>} />
                <Route path="subjects" element={<Subjects/>} />
            </Route>
            <Route path="*" element={<Navigate to="/admin/dashboard" replace/>} />
        </Routes>
    );
}

export default AdminRouter;