import React from "react";
import styled from "styled-components";
import { useNavigate } from "react-router-dom";

const ItemContainer = styled.div`
  display: flex;
  justify-content: space-between;
  padding: 10px;
  border-bottom: 1px solid #ddd;
  cursor: pointer;

  &:hover {
    background-color: #f9f9f9;
  }
`;

const ItemInfo = styled.div`
  display: flex;
  flex-direction: column;
`;

const ItemAmount = styled.div`
  font-weight: bold;
`;

const ExpenseItem = ({ expense }) => {
  const navigate = useNavigate();

  const handleClick = () => {
    navigate(`/expense/${expense.id}`);
  };

  return (
    <ItemContainer onClick={handleClick}>
      <ItemInfo>
        <div>{expense.date}</div>
        <div>{expense.item}</div>
        <div>{expense.createdBy}</div>
      </ItemInfo>
      <ItemAmount>{expense.amount}원</ItemAmount>
    </ItemContainer>
  );
};

export default ExpenseItem;
