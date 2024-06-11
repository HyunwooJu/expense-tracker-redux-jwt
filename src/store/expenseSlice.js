import { createSlice } from "@reduxjs/toolkit";
import fakeData from "../fakeData.json";

const initialState = {
  expenses: fakeData,
  selectedMonth: new Date().getMonth() + 1,
};

const expenseSlice = createSlice({
  name: "expenses",
  initialState,
  reducers: {
    addExpense: (state, action) => {
      state.expenses.push(action.payload);
    },
    updateExpense: (state, action) => {
      const index = state.expenses.findIndex(
        (exp) => exp.id === action.payload.id
      );
      if (index !== -1) {
        state.expenses[index] = action.payload;
      }
    },
    deleteExpense: (state, action) => {
      state.expenses = state.expenses.filter(
        (exp) => exp.id !== action.payload
      );
    },
    setSelectedMonth: (state, action) => {
      state.selectedMonth = action.payload;
    },
  },
});

export const { addExpense, updateExpense, deleteExpense, setSelectedMonth } =
  expenseSlice.actions;
export default expenseSlice.reducer;
