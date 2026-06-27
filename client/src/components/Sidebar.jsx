import { useState } from "react";
import {
  LayoutDashboard,
  PlusCircle,
  Ticket,
  User,
  LogOut,
  Menu,
  X,
} from "lucide-react";
import { logout } from "../redux/userSlice";
import { useDispatch } from "react-redux";
import { useSelector } from "react-redux";

import { Link, useNavigate } from "react-router-dom";

const Sidebar = () => {
  const navigate = useNavigate();
  const [isOpen, setIsOpen] = useState(false);
  const [showLogoutModal, setShowLogoutModal] = useState(false);
  
  const dispatch = useDispatch();
  const { currentUser } = useSelector((state) => state.user);

  const closeSidebar = () => setIsOpen(false);

  return (
    <>
      {/* Mobile Menu Button */}
      <button
        onClick={() => setIsOpen(true)}
        className="sm:hidden fixed top-4 left-4 z-50 bg-white p-2 rounded-lg shadow-md"
      >
        <Menu size={24} />
      </button>

      {/* Overlay */}
      {isOpen && (
        <div
          className="fixed inset-0 bg-black/40 z-40 sm:hidden"
          onClick={closeSidebar}
        />
      )}

      {/* Sidebar */}
      <div
        className={`
          fixed sm:static top-0 left-0 h-screen rounded-3xl p-2
          w-64 bg-white shadow-lg z-50
          transform transition-transform duration-300
          ${isOpen ? "translate-x-0" : "-translate-x-full sm:translate-x-0"}
          flex flex-col
        `}
      >
        {/* Header */}
        <div className="p-6 border-b flex items-center justify-between">
          <h1 className="text-3xl font-bold font-serif text-orange-500">Asset Hub</h1>

          <button onClick={closeSidebar} className="sm:hidden">
            <X size={24} />
          </button>
        </div>

        {/* Navigation */}

        {currentUser?.role === "ADMIN" ? (
          <nav className="flex-1 p-4 space-y-3">
            <Link
              to="/dashboard"
              onClick={closeSidebar}
              className="flex items-center gap-3 p-3 rounded-xl hover:bg-orange-100"
            >
              <LayoutDashboard className="text-orange-500" />
              Dashboard
            </Link>

            <Link
              to="/all-files"
              onClick={closeSidebar}
              className="flex items-center gap-3 p-3 rounded-xl hover:bg-orange-100"
            >
              <PlusCircle className="text-orange-500" />
              All Tickets
            </Link>
            <Link
              to="/all-users"
              onClick={closeSidebar}
              className="flex items-center gap-3 p-3 rounded-xl hover:bg-orange-100"
            >
              <PlusCircle className="text-orange-500"/>
              All Users
            </Link>

            <Link
              to="/profile"
              onClick={closeSidebar}
              className="flex items-center gap-3 p-3 rounded-xl hover:bg-orange-100"
            >
              <User className="text-orange-500"/>
              Profile
            </Link>
          </nav>
        ) : currentUser?.role === "EMPLOYEE" ? (
          <nav className="flex-1 p-4 space-y-3 ">
            <Link
              to="/dashboard"
              onClick={closeSidebar}
              className="flex items-center gap-3 p-3 rounded-xl hover:bg-orange-100"
            >
              <LayoutDashboard className="text-orange-500"/>
              Dashboard
            </Link>

            <Link
              to="/file-upload"
              onClick={closeSidebar}
              className="flex items-center gap-3 p-3 rounded-xl hover:bg-orange-100"
            >
              <PlusCircle className="text-orange-500"/>
              Upload File
            </Link>

            <Link
              to="/my-files"
              onClick={closeSidebar}
              className="flex items-center gap-3 p-3 rounded-xl hover:bg-orange-100"
            >
              <Ticket className="text-orange-500"/>
              My Documents
            </Link>

            <Link
              to="/profile"
              onClick={closeSidebar}
              className="flex items-center gap-3 p-3 rounded-xl hover:bg-orange-100"
            >
              <User className="text-orange-500"/>
              Profile
            </Link>
          </nav>
        ) : (
          <nav className="flex-1 p-4 space-y-3">
            <Link
              to="/dashboard"
              onClick={closeSidebar}
              className="flex items-center gap-3 p-3 rounded-xl hover:bg-orange-100"
            >
              <LayoutDashboard className="text-orange-500"/>
              Dashboard
            </Link>

            <Link
              to="/assigned-files"
              onClick={closeSidebar}
              className="flex items-center gap-3 p-3 rounded-xl hover:bg-orange-100"
            >
              <Ticket className="text-orange-500"/>
              Assigned Files
            </Link>

            <Link
              to="/profile"
              onClick={closeSidebar}
              className="flex items-center gap-3 p-3 rounded-xl hover:bg-orange-100"
            >
              <User className="text-orange-500"/>
              Profile
            </Link>
          </nav>
        )}

        {/* Logout */}
        <button
          onClick={() => setShowLogoutModal(true)}
          className="m-4 bg-orange-500 text-white p-3 rounded-xl flex items-center justify-center gap-2 cursor-pointer"
        >
          <LogOut />
          Logout
        </button>
      </div>


      {showLogoutModal && (
  <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50">
    <div className="bg-white rounded-2xl p-6 w-80 shadow-lg">
      <h2 className="text-xl font-bold text-gray-800">
        Confirm Logout
      </h2>

      <p className="text-gray-500 mt-2">
        Are you sure you want to logout?
      </p>

      <div className="flex justify-end gap-3 mt-6">
        <button
          onClick={() => setShowLogoutModal(false)}
          className="px-4 py-2 rounded-lg bg-gray-200 hover:bg-gray-300"
        >
          Cancel
        </button>

        <button
          onClick={() => {
            dispatch(logout());
            navigate("/login");
          }}
          className="px-4 py-2 rounded-lg bg-red-500 text-white hover:bg-red-600"
        >
          Logout
        </button>
      </div>
    </div>
  </div>
)}
    </>
  );
};

export default Sidebar;
