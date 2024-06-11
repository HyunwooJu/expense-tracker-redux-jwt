import { configureStore } from "@reduxjs/toolkit";
import expenseReducer from "./store/expenseSlice";

const store = configureStore({
  reducer: {
    expenses: expenseReducer,
  },
});

export default store;
