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

const Login = () => {
  const [id, setId] = useState("");
  const [password, setPassword] = useState("");
  const { login } = useAuth();
  const navigate = useNavigate();

  const handleSubmit = (e) => {
    e.preventDefault();
    login(
      { id, password },
      {
        onSuccess: () => {
          toast.success("로그인 성공!");
          navigate("/home");
        },
        onError: () => {
          toast.error("로그인 실패!");
        },
      }
    );
  };

  return (
    <Container>
      <h2>로그인</h2>
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
        <ButtonGroup>
          <Button type="submit">로그인</Button>
          <Button onClick={() => navigate("/register")}>회원가입</Button>
        </ButtonGroup>
      </Form>
    </Container>
  );
};

export default Login;
