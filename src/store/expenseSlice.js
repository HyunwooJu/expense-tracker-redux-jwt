import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";

const API_URL = "http://localhost:5001/expenses";

// Async thunks
export const fetchExpenses = createAsyncThunk(
  "expenses/fetchExpenses",
  async () => {
    const response = await axios.get(API_URL);
    const localExpenses = JSON.parse(localStorage.getItem("expenses")) || [];
    return [...response.data, ...localExpenses];
  }
);

export const addExpense = createAsyncThunk(
  "expenses/addExpense",
  async (expense) => {
    const response = await axios.post(API_URL, expense);
    return response.data;
  }
);

export const updateExpense = createAsyncThunk(
  "expenses/updateExpense",
  async (expense) => {
    const response = await axios.put(`${API_URL}/${expense.id}`, expense);
    return response.data;
  }
);

export const deleteExpense = createAsyncThunk(
  "expenses/deleteExpense",
  async (id) => {
    const response = await axios.delete(`${API_URL}/${id}`);
    return response.data;
  }
);

const initialState = {
  expenses: [],
  loading: false,
  error: null,
  selectedMonth: new Date().getMonth() + 1,
};

const expenseSlice = createSlice({
  name: "expenses",
  initialState,
  reducers: {
    setSelectedMonth: (state, action) => {
      state.selectedMonth = action.payload;
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(fetchExpenses.pending, (state) => {
        state.loading = true;
      })
      .addCase(fetchExpenses.fulfilled, (state, action) => {
        state.loading = false;
        state.expenses = action.payload;
      })
      .addCase(fetchExpenses.rejected, (state, action) => {
        state.loading = false;
        state.error = action.error.message;
      })
      .addCase(addExpense.fulfilled, (state, action) => {
        state.expenses.push(action.payload);
      })
      .addCase(updateExpense.fulfilled, (state, action) => {
        const index = state.expenses.findIndex(
          (expense) => expense.id === action.payload.id
        );
        state.expenses[index] = action.payload;
      })
      .addCase(deleteExpense.fulfilled, (state, action) => {
        state.expenses = state.expenses.filter(
          (expense) => expense.id !== action.meta.arg
        );
      });
  },
});

export const { setSelectedMonth } = expenseSlice.actions;

export default expenseSlice.reducer;
