import React, { createContext, useState } from "react";
import fakeData from "../fakeData.json";

export const ExpenseContext = createContext();

export const ExpenseProvider = ({ children }) => {
  const [expenses, setExpenses] = useState(fakeData);
  const [selectedMonth, setSelectedMonth] = useState(new Date().getMonth() + 1);

  const addExpense = (expense) => {
    setExpenses([...expenses, expense]);
  };

  return (
    <ExpenseContext.Provider
      value={{
        expenses,
        setExpenses,
        selectedMonth,
        setSelectedMonth,
        addExpense,
      }}
    >
      {children}
    </ExpenseContext.Provider>
  );
};
