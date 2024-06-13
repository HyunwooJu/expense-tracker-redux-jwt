import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { useAuth } from "../hooks/useAuth";
import { toast } from "react-toastify";
import styled from "styled-components";

const Container = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  height: 100vh;
  background-color: #e0f7fa;
`;

const Form = styled.form`
  display: flex;
  flex-direction: column;
  gap: 10px;
  width: 300px;
`;

const Input = styled.input`
  padding: 10px;
  border: 1px solid #ccc;
  border-radius: 5px;
`;

const ButtonGroup = styled.div`
  display: flex;
  flex-direction: column;
  gap: 10px;
  width: 100%;
`;

const Button = styled.button`
  padding: 10px;
  background-color: #007bff;
  color: white;
  border: none;
  border-radius: 5px;
  cursor: pointer;
  margin-top: 10px;
  width: 100%;
  &:hover {
    background-color: #0056b3;
  }
`;

const Register = () => {
  const [id, setId] = useState("");
  const [password, setPassword] = useState("");
  const [nickname, setNickname] = useState("");
  const { register } = useAuth();
  const navigate = useNavigate();

  const handleSubmit = (e) => {
    e.preventDefault();
    if (id.length < 4 || id.length > 10) {
      toast.error("아이디는 4~10글자로 입력해주세요!");
      return;
    }
    if (password.length < 4 || password.length > 15) {
      toast.error("비밀번호는 4~15글자로 입력해주세요!");
      return;
    }
    if (nickname.length < 1 || nickname.length > 10) {
      toast.error("닉네임은 1~10글자로 입력해주세요!");
      return;
    }
    register(
      { id, password, nickname },
      {
        onSuccess: () => {
          toast.success("회원가입 성공!");
          navigate("/");
        },
        onError: (error) => {
          if (error.response.status === 409) {
            toast.error("아이디가 이미 존재합니다.");
          } else {
            toast.error("회원가입 실패!");
          }
        },
      }
    );
  };

  return (
    <Container>
      <h2>회원가입</h2>
      <Form onSubmit={handleSubmit}>
        <Input
          type="text"
          value={id}
          onChange={(e) => setId(e.target.value)}
          placeholder="아이디"
        />
        <Input
          type="password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          placeholder="비밀번호"
        />
        <Input
          type="text"
          value={nickname}
          onChange={(e) => setNickname(e.target.value)}
          placeholder="닉네임"
        />
        <ButtonGroup>
          <Button type="submit">회원가입</Button>
          <Button onClick={() => navigate("/")}>로그인</Button>
        </ButtonGroup>
      </Form>
    </Container>
  );
};

export default Register;
