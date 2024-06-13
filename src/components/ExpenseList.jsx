import React from "react";
import styled from "styled-components";
import ExpenseItem from "./ExpenseItem";

const ListContainer = styled.div`
  margin-top: 20px;
`;

const ExpenseList = ({ expenses }) => {
  return (
    <ListContainer>
      {expenses.map((expense) => (
        <ExpenseItem key={expense.id} expense={expense} />
      ))}
    </ListContainer>
  );
};

export default ExpenseList;
