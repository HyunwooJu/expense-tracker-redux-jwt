import React, { useState } from "react";
import { useDispatch } from "react-redux";
import styled from "styled-components";
import { addExpense } from "../store/expenseSlice";

const ExpenseForm = () => {
  const [date, setDate] = useState("");
  const [item, setItem] = useState("");
  const [amount, setAmount] = useState("");
  const [description, setDescription] = useState("");
  const dispatch = useDispatch();

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!date || !item || !amount || !description) return;
    dispatch(
      addExpense({
        id: Date.now().toString(),
        date,
        item,
        amount: parseInt(amount, 10),
        description,
      })
    );
    setDate("");
    setItem("");
    setAmount("");
    setDescription("");
  };

  return (
    <Form onSubmit={handleSubmit}>
      <Input
        type="date"
        value={date}
        onChange={(e) => setDate(e.target.value)}
        required
      />
      <Input
        type="text"
        placeholder="지출 항목"
        value={item}
        onChange={(e) => setItem(e.target.value)}
        required
      />
      <Input
        type="number"
        placeholder="지출 금액"
        value={amount}
        onChange={(e) => setAmount(e.target.value)}
        required
      />
      <Input
        type="text"
        placeholder="지출 내용"
        value={description}
        onChange={(e) => setDescription(e.target.value)}
        required
      />
      <Button type="submit">저장</Button>
    </Form>
  );
};

const Form = styled.form`
  display: flex;
  flex-direction: column;
  gap: 10px;
  margin-bottom: 20px;
`;

const Input = styled.input`
  padding: 10px;
  border: 1px solid #ccc;
  border-radius: 5px;
`;

const Button = styled.button`
  padding: 10px;
  background-color: #007bff;
  color: white;
  border: none;
  border-radius: 5px;
  cursor: pointer;

  &:hover {
    background-color: #0056b3;
  }
`;

export default ExpenseForm;
