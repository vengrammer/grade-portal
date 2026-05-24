
import { BrowserRouter, Route, Routes } from "react-router-dom"
import StudentRouter from "./routers/StudentRouter"
import NotFound from "./components/NotFound"
import LandingPageLayout from "./layout/LandingPageLayout"
import { Navigate } from "react-router-dom"
import AdminRouter from "./routers/AdminRouter"
import TeacherRouter from "./routers/TeacherRouter"
import "react-toastify/dist/ReactToastify.css";
import { ToastContainer } from "react-toastify";

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Navigate to="/login" replace/>}/>
        <Route path="/login" element={<LandingPageLayout />} />
        <Route path="/student/*" element={<StudentRouter />} /> 
        <Route path="/teacher/*" element={<TeacherRouter />} /> 
        <Route path="/admin/*" element={<AdminRouter />} />
        <Route path="*" element={<NotFound />} />
      </Routes>
      <ToastContainer
          position="bottom-right"
          autoClose={4000}
          newestOnTop={false}
          closeOnClick
          pauseOnHover
          draggable
          theme="colored"
        />
    </BrowserRouter>
  )
}

export default App
