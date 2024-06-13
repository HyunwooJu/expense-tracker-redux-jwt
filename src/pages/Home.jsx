import React, { useState, useEffect } from "react";
import styled from "styled-components";
import ExpenseForm from "../components/ExpenseForm";
import ExpenseSummary from "../components/ExpenseSummary";
import MonthSelector from "../components/MonthSelector";
import ExpenseList from "../components/ExpenseList";
import { useExpenses } from "../hooks/useExpenses";

const Container = styled.div`
  padding: 20px;
  max-width: 1200px;
  margin: 0 auto;
`;

const Home = () => {
  const {
    expenses,
    isLoading,
    error,
    addExpense,
    updateExpense,
    deleteExpense,
  } = useExpenses();
  const [selectedMonth, setSelectedMonth] = useState(new Date().getMonth() + 1);

  if (isLoading) return <div>Loading...</div>;
  if (error) return <div>Error loading expenses</div>;

  const filteredExpenses = expenses.filter(
    (expense) => new Date(expense.date).getMonth() + 1 === selectedMonth
  );

  return (
    <Container>
      <ExpenseForm onAddExpense={addExpense} />
      <MonthSelector
        selectedMonth={selectedMonth}
        onMonthChange={setSelectedMonth}
      />
      <ExpenseSummary
        expenses={filteredExpenses}
        selectedMonth={selectedMonth}
      />
      <ExpenseList
        expenses={filteredExpenses}
        onUpdateExpense={updateExpense}
        onDeleteExpense={deleteExpense}
      />
    </Container>
  );
};

export default Home;
