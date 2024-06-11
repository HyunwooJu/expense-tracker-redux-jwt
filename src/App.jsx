import React from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Home from "./pages/Home";
import ExpenseDetail from "./pages/ExpenseDetail";
import { ExpenseProvider } from "./context/ExpenseContext";

const App = () => {
  return (
    <ExpenseProvider>
      <Router>
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/expense/:id" element={<ExpenseDetail />} />
        </Routes>
      </Router>
    </ExpenseProvider>
  );
};

export default App;
