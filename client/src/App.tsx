
import { BrowserRouter, Route, Routes } from "react-router-dom"
import StudentRouter from "./routers/StudentRouter"
import NotFound from "./components/NotFound"

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/student/*" element={<StudentRouter />} />
        <Route path="*" element={<NotFound />} />
      </Routes>

    </BrowserRouter>
  )
}

export default App
