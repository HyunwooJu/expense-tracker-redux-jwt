import React, { useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import { selectUser, setUser } from "../store/authSlice";
import styled from "styled-components";
import { toast } from "react-toastify";
import { useExpenses } from "../hooks/useExpenses";

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
  border: none;
  border-radius: 5px;
  cursor: pointer;
  background-color: #007bff;
  color: white;
  &:hover {
    opacity: 0.8;
  }
`;

const Profile = () => {
  const user = useSelector(selectUser);
  const dispatch = useDispatch();
  const [username, setUsername] = useState(user ? user.username : "");
  const [avatar, setAvatar] = useState(null);
  const { expenses, updateExpense } = useExpenses();

  const handleUpdateProfile = () => {
    dispatch(
      setUser({
        username,
        avatar: avatar
          ? URL.createObjectURL(avatar)
          : user.avatar || "/default-img.png",
      })
    );

    // 본인이 작성한 지출 항목만 업데이트
    expenses.forEach((expense) => {
      if (expense.createdBy === user.username) {
        updateExpense({
          ...expense,
          createdBy: username,
        });
      }
    });

    toast.success("프로필이 업데이트 되었습니다.");
  };

  return (
    <Container>
      <h2>닉네임 수정</h2>
      <Input
        type="text"
        value={username}
        onChange={(e) => setUsername(e.target.value)}
      />
      <h2>프로필 이미지 수정</h2>
      <Input type="file" onChange={(e) => setAvatar(e.target.files[0])} />
      <Button onClick={handleUpdateProfile}>프로필 업데이트</Button>
    </Container>
  );
};

export default Profile;
