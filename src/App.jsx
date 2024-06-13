import React from "react";
import { Routes, Route } from "react-router-dom";
import Home from "./pages/Home";
import Login from "./pages/Login";
import Register from "./pages/Register";
import ExpenseDetail from "./pages/ExpenseDetail";
import ProtectedRoute from "./components/ProtectedRoute";
import NavigationBar from "./components/NavigationBar";
import Profile from "./pages/Profile";
import { useSelector } from "react-redux";

const App = () => {
  const user = useSelector((state) => state.auth.user);

  return (
    <>
      {user && <NavigationBar />}
      <Routes>
        <Route path="/" element={<Login />} />
        <Route path="/register" element={<Register />} />
        <Route path="/home" element={<ProtectedRoute component={Home} />} />
        <Route
          path="/expense/:id"
          element={<ProtectedRoute component={ExpenseDetail} />}
        />
        <Route
          path="/profile"
          element={<ProtectedRoute component={Profile} />}
        />
      </Routes>
    </>
  );
};

export default App;
