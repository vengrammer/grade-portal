
import { BrowserRouter, Route, Routes } from "react-router-dom"
import StudentRouter from "./routers/StudentRouter"
import NotFound from "./components/NotFound"
import LandingPageLayout from "./layout/LandingPageLayout"
import { Navigate } from "react-router-dom"
import AdminRouter from "./routers/AdminRouter"
import TeacherRouter from "./routers/TeacherRouter"
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
    </BrowserRouter>
  )
}

export default App
