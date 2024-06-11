import React from "react";
import { useDispatch, useSelector } from "react-redux";
import styled from "styled-components";
import { setSelectedMonth } from "../store/expenseSlice";

const MonthButton = styled.button`
  background-color: ${(props) => (props.$isSelected ? "#2ecc71" : "#ecf0f1")};
  border: none;
  padding: 10px;
  margin: 5px;
  cursor: pointer;
  &:hover {
    background-color: #bdc3c7;
  }
`;

const MonthSelector = () => {
  const dispatch = useDispatch();
  const selectedMonth = useSelector((state) => state.expenses.selectedMonth);
  const months = Array.from({ length: 12 }, (_, i) => i + 1);

  return (
    <div>
      {months.map((month) => (
        <MonthButton
          key={month}
          $isSelected={month === selectedMonth}
          onClick={() => dispatch(setSelectedMonth(month))}
        >
          {month}월
        </MonthButton>
      ))}
    </div>
  );
};

export default MonthSelector;
