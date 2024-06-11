import React from "react";
import styled from "styled-components";
import { useNavigate } from "react-router-dom";

const ExpenseItem = ({ expense }) => {
  const navigate = useNavigate();

  const handleDetailClick = () => {
    navigate(`/detail/${expense.id}`);
  };

  return (
    <Item onClick={handleDetailClick}>
      <Date>{expense.date}</Date>
      <ItemText>{expense.item}</ItemText>
      <Amount>{expense.amount.toLocaleString()}원</Amount>
      <Description>{expense.description}</Description>
    </Item>
  );
};

const Item = styled.div`
  display: flex;
  justify-content: space-between;
  padding: 10px;
  border: 1px solid #ccc;
  border-radius: 5px;
  cursor: pointer;

  &:hover {
    background-color: #f0f0f0;
  }
`;

const Date = styled.div`
  flex: 1;
`;

const ItemText = styled.div`
  flex: 2;
  white-space: nowrap; /* 한 줄로 제한 */
  overflow: hidden; /* 넘친 부분 숨기기 */
  text-overflow: ellipsis; /* ... 표시 */
  max-width: 100px; /* 너비 제한 */
`;

const Amount = styled.div`
  flex: 1;
  text-align: right;
`;

const Description = styled.div`
  flex: 3;
  white-space: nowrap; /* 한 줄로 제한 */
  overflow: hidden; /* 넘친 부분 숨기기 */
  text-overflow: ellipsis; /* ... 표시 */
  text-align: right;
  max-width: 200px; /* 너비 제한 */
`;

export default ExpenseItem;
