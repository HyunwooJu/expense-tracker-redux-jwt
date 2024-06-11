import React, { useRef } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { useSelector, useDispatch } from "react-redux";
import styled from "styled-components";
import { deleteExpense, updateExpense } from "../store/expenseSlice";

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
  const dispatch = useDispatch();
  const expenses = useSelector((state) => state.expenses.expenses || []);
  const expense = expenses.find((expense) => expense.id === id);

  const dateRef = useRef();
  const itemRef = useRef();
  const amountRef = useRef();
  const descriptionRef = useRef();

  if (!expense) {
    return <div>지출 항목을 찾을 수 없습니다.</div>;
  }

  const handleUpdate = () => {
    const updatedExpense = {
      ...expense,
      date: dateRef.current.value,
      item: itemRef.current.value,
      amount: parseInt(amountRef.current.value, 10),
      description: descriptionRef.current.value,
    };
    dispatch(updateExpense(updatedExpense));
    navigate("/");
  };

  const handleDelete = () => {
    if (window.confirm("정말로 이 지출 항목을 삭제하시겠습니까?")) {
      dispatch(deleteExpense(id));
      navigate("/");
    }
  };

  return (
    <Container>
      <Input type="date" defaultValue={expense.date} ref={dateRef} />
      <Input type="text" defaultValue={expense.item} ref={itemRef} />
      <Input type="number" defaultValue={expense.amount} ref={amountRef} />
      <Input
        type="text"
        defaultValue={expense.description}
        ref={descriptionRef}
      />
      <ButtonGroup>
        <UpdateButton onClick={handleUpdate}>수정</UpdateButton>
        <DeleteButton onClick={handleDelete}>삭제</DeleteButton>
        <BackButton onClick={() => navigate("/")}>뒤로 가기</BackButton>
      </ButtonGroup>
    </Container>
  );
};

export default ExpenseDetail;
