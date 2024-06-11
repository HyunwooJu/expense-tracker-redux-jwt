import React, { useState } from "react";
import styled from "styled-components";
import { useSelector, useDispatch } from "react-redux";
import { addExpense, setSelectedMonth } from "../store/expenseSlice";
import ExpenseForm from "../components/ExpenseForm";
import ExpenseSummary from "../components/ExpenseSummary";
import MonthSelector from "../components/MonthSelector";
import ExpenseList from "../components/ExpenseList";

const Container = styled.div`
  padding: 20px;
  max-width: 1200px;
  margin: 0 auto;
`;

const Home = () => {
  const dispatch = useDispatch();
  const expenses = useSelector((state) => state.expenses.expenses || []);
  const selectedMonth = useSelector((state) => state.expenses.selectedMonth);

  const handleAddExpense = (expense) => {
    dispatch(addExpense(expense));
  };

  const handleMonthChange = (month) => {
    dispatch(setSelectedMonth(month));
  };

  const filteredExpenses = expenses.filter(
    (expense) => new Date(expense.date).getMonth() + 1 === selectedMonth
  );

  return (
    <Container>
      <ExpenseForm onAddExpense={handleAddExpense} />
      <MonthSelector
        selectedMonth={selectedMonth}
        onMonthChange={handleMonthChange}
      />
      <ExpenseSummary
        expenses={filteredExpenses}
        selectedMonth={selectedMonth}
      />
      <ExpenseList expenses={filteredExpenses} />
    </Container>
  );
};

export default Home;
