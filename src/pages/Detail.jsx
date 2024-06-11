import React, { useState, useEffect } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { useSelector, useDispatch } from "react-redux";
import styled from "styled-components";
import {
  getExpensesFromLocalStorage,
  saveExpensesToLocalStorage,
} from "../utils/localStorage";
import { updateExpense } from "../store/expenseSlice";

const Container = styled.div`
  padding: 20px;
  max-width: 600px;
  margin: 0 auto;
`;

const Input = styled.input`
  width: 100%;
  padding: 10px;
  margin-bottom: 10px;
  border: 1px solid #ddd;
  border-radius: 5px;
`;

const Button = styled.button`
  padding: 10px 20px;
  background-color: #007bff;
  color: white;
  border: none;
  border-radius: 5px;
  cursor: pointer;

  &:hover {
    background-color: #0056b3;
  }
`;

const Detail = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const expenses = useSelector((state) => state.expenses.expenses || []);
  const [expense, setExpense] = useState(null);
  const [date, setDate] = useState("");
  const [item, setItem] = useState("");
  const [amount, setAmount] = useState("");
  const [description, setDescription] = useState("");

  useEffect(() => {
    const expense = expenses.find((exp) => exp.id === id);
    if (expense) {
      setExpense(expense);
      setDate(expense.date);
      setItem(expense.item);
      setAmount(expense.amount);
      setDescription(expense.description);
    }
  }, [id, expenses]);

  const handleSave = () => {
    const updatedExpense = {
      ...expense,
      date,
      item,
      amount: parseInt(amount, 10),
      description,
    };
    dispatch(updateExpense(updatedExpense));
    navigate("/");
  };

  if (!expense) return <div>지출 항목을 찾을 수 없습니다.</div>;

  return (
    <Container>
      <h2>지출 항목 수정</h2>
      <Input
        type="date"
        value={date}
        onChange={(e) => setDate(e.target.value)}
      />
      <Input
        type="text"
        placeholder="지출 항목"
        value={item}
        onChange={(e) => setItem(e.target.value)}
      />
      <Input
        type="number"
        placeholder="지출 금액"
        value={amount}
        onChange={(e) => setAmount(e.target.value)}
      />
      <Input
        type="text"
        placeholder="지출 내용"
        value={description}
        onChange={(e) => setDescription(e.target.value)}
      />
      <Button onClick={handleSave}>저장</Button>
    </Container>
  );
};

export default Detail;
