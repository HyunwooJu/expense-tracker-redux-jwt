import { configureStore } from "@reduxjs/toolkit";
import expenseReducer from "./store/expenseSlice";
import authReducer from "./store/authSlice";
import fakeData from "./fakeData.json";

const preloadedState = {
  expenses: {
    expenses: fakeData,
    selectedMonth: new Date().getMonth() + 1,
  },
  auth: {
    user: null,
    token: localStorage.getItem("token"),
  },
};

const store = configureStore({
  reducer: {
    expenses: expenseReducer,
    auth: authReducer,
  },
  preloadedState,
});

export default store;
