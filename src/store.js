import { configureStore } from "@reduxjs/toolkit";
import expenseReducer from "./store/expenseSlice";
import { getExpensesFromLocalStorage } from "./utils/localStorage";

const preloadedState = {
  expenses: {
    expenses: getExpensesFromLocalStorage(),
    selectedMonth: new Date().getMonth() + 1,
  },
};

const store = configureStore({
  reducer: {
    expenses: expenseReducer,
  },
  preloadedState,
});

export default store;
