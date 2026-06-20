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
// import CreateTicket from "./pages/Create";

import { ToastContainer } from "react-toastify";
import './App.css'

function App() {

  const ProtectedRoute = () => {
  const user = true;
  return user ? <Outlet /> : <Navigate to="/login" />;
};


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
          {/* <Route path="/create-ticket" element={<CreateTicket />}></Route> */}
         
        </Routes>
      </BrowserRouter>
    </>
  )
}

export default App
