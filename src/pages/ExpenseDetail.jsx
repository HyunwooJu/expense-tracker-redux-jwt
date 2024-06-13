import React, { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import styled from "styled-components";
import { useExpenses } from "../hooks/useExpenses";
import { useSelector } from "react-redux";
import { selectUser } from "../store/authSlice";

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

const ButtonGroup = styled.div`
  display: flex;
  justify-content: space-between;
`;

const Button = styled.button`
  padding: 10px 20px;
  border: none;
  border-radius: 5px;
  cursor: pointer;
  &:hover {
    opacity: 0.8;
  }
`;

const UpdateButton = styled(Button)`
  background-color: #007bff;
  color: white;
`;

const DeleteButton = styled(Button)`
  background-color: #dc3545;
  color: white;
`;

const BackButton = styled(Button)`
  background-color: #6c757d;
  color: white;
`;

const ExpenseDetail = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const { expenses, updateExpense, deleteExpense } = useExpenses();
  const user = useSelector(selectUser);

  const expense = expenses?.find((expense) => expense.id === id);

  const [date, setDate] = useState("");
  const [item, setItem] = useState("");
  const [amount, setAmount] = useState("");
  const [description, setDescription] = useState("");

  useEffect(() => {
    if (expense) {
      setDate(expense.date);
      setItem(expense.item);
      setAmount(expense.amount);
      setDescription(expense.description);
    }
  }, [expense]);

  const handleUpdate = () => {
    updateExpense({
      id: expense.id,
      date,
      item,
      amount: parseInt(amount, 10),
      description,
      createdBy: expense.createdBy, // 수정 시 작성자 정보 유지
    });
    navigate("/home");
  };

  const handleDelete = () => {
    if (window.confirm("정말로 이 지출 항목을 삭제하시겠습니까?")) {
      deleteExpense(id);
      navigate("/home");
    }
  };

  if (!expense) {
    return <div>지출 항목을 찾을 수 없습니다.</div>;
  }

  if (expense.createdBy !== user.username) {
    return <div>수정 권한이 없습니다!</div>;
  }

  return (
    <Container>
      <Input
        type="date"
        value={date}
        onChange={(e) => setDate(e.target.value)}
      />
      <Input
        type="text"
        value={item}
        onChange={(e) => setItem(e.target.value)}
      />
      <Input
        type="number"
        value={amount}
        onChange={(e) => setAmount(e.target.value)}
      />
      <Input
        type="text"
        value={description}
        onChange={(e) => setDescription(e.target.value)}
      />
      <ButtonGroup>
        <UpdateButton onClick={handleUpdate}>수정</UpdateButton>
        <DeleteButton onClick={handleDelete}>삭제</DeleteButton>
        <BackButton onClick={() => navigate("/home")}>뒤로 가기</BackButton>
      </ButtonGroup>
    </Container>
  );
};

export default ExpenseDetail;
