import { BrowserRouter, Routes, Route } from "react-router-dom";
import "./index.css";
import ProtectedRoute from "./ProtectedRoute";
import Login from "./pages/Login";
import Dashboard from "./pages/Dashboard";
import Signup from "./pages/Signup";
import AddStudent from "./pages/AddStudent";

function App() {
  // const [count, setCount] = useState(0);

  return (
    <>
      <BrowserRouter>
        <Routes>
          <Route path="/signup" element={<Signup />} />
          <Route path="/" element={<Signup />} />
          <Route path="/login" element={<Login />} />
          <Route
            path="/dashboard"
            element={
              <ProtectedRoute>
                <Dashboard />{" "}
                {/* This Route is protected and con't be accesed without authorisation */}
              </ProtectedRoute>
            }
          />
          <Route path="*" element={<h1>404 Not Found</h1>} />
          <Route path="/add-student" element={<AddStudent />} />
        </Routes>
      </BrowserRouter>
    </>
  );
}

export default App;
