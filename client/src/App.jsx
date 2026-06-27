import {
  BrowserRouter,
  Routes,
  Route,
  Outlet,
  Navigate,
} from "react-router-dom";

//import Header from "./pages/Header/Header";
import Home from "./pages/Home";
import Register from "./pages/Registration";
import Login from "./pages/Login";
import Dashboard from "./pages/Dashboard";
import FileUpload from "./pages/FileUpload";
import MyFiles from "./pages/MyFiles";
import AllFiles from "./pages/AllFiles";
import AssignedFiles from "./pages/AssignedFiles";
import Profile from "./pages/Profile";
import { ToastContainer } from "react-toastify";
import "./App.css";
import { useSelector } from "react-redux";

const ProtectedRoute = () => {
    const { currentUser } = useSelector((state) => state.user);
    return currentUser ? <Outlet /> : <Navigate to="/login" />;
  };

function App() {


  return (
    <>
      <BrowserRouter>
        <ToastContainer position="top-center" autoClose={3000} />

        <Routes>
          <Route element={<ProtectedRoute />}>
            <Route path="/dashboard" element={<Dashboard />}></Route>
          </Route>

          <Route path="/" element={<Home />}></Route>
          <Route path="/register" element={<Register />}></Route>
          <Route path="/login" element={<Login />}></Route>
          <Route path="/file-upload" element={<FileUpload />}></Route>
          <Route path="/my-files" element={<MyFiles />}></Route>
          <Route path="/all-files" element={<AllFiles />}></Route>
          <Route path="/assigned-files" element={<AssignedFiles />}></Route>
          <Route path="/profile" element={<Profile />}></Route>
        </Routes>
      </BrowserRouter>
    </>
  );
}

export default App;
