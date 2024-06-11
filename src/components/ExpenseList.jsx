import React from "react";
import { Link } from "react-router-dom";
import styled from "styled-components";

const ListContainer = styled.div`
  margin-top: 20px;
`;

const ListItem = styled(Link)`
  display: flex;
  justify-content: space-between;
  padding: 10px;
  margin-bottom: 10px;
  background-color: #f9f9f9;
  border: 1px solid #ddd;
  border-radius: 5px;
  text-decoration: none;
  color: inherit;

  &:hover {
    background-color: #f0f0f0;
  }
`;

const ExpenseList = ({ expenses = [] }) => {
  return (
    <ListContainer>
      {expenses.map((expense) => (
        <ListItem key={expense.id} to={`/expense/${expense.id}`}>
          <span>
            {expense.date
              ? new Date(expense.date).toLocaleDateString()
              : "날짜 없음"}
          </span>
          <span>{expense.item}</span>
          <span>
            {expense.amount ? expense.amount.toLocaleString() : "금액 없음"} 원
          </span>
          <span>{expense.description}</span>
        </ListItem>
      ))}
    </ListContainer>
  );
};

export default ExpenseList;
