import {Routes, Route} from "react-router-dom";
import { Navigate } from "react-router-dom";

import AdminLayout from "../layout/AdminLayout";
import AdminDashboard from "../components/admin/AdminDashboard";
function AdminRouter() {
    return (
        <Routes >
            <Route element={<AdminLayout />}>
                <Route path="/" element={<Navigate to="/admin/dashboard" replace/>} />
                <Route path="dashboard" element={<AdminDashboard/>} />
            </Route>
            <Route path="*" element={<Navigate to="/admin/dashboard" replace/>} />
        </Routes>
    );
}

export default AdminRouter;