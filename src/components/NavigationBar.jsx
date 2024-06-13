import React from "react";
import { Link, useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import styled from "styled-components";
import { clearAuth, selectUser } from "../store/authSlice";

const NavBar = styled.nav`
  display: flex;
  justify-content: space-between;
  align-items: center;
  background-color: #333;
  padding: 10px 20px;
`;

const NavLink = styled(Link)`
  color: white;
  text-decoration: none;
  margin-right: 20px;

  &:hover {
    text-decoration: underline;
  }
`;

const UserInfo = styled.div`
  display: flex;
  align-items: center;
`;

const UserName = styled.span`
  color: white;
  margin-right: 10px;
`;

const Avatar = styled.img`
  width: 30px;
  height: 30px;
  border-radius: 50%;
  margin-right: 10px;
`;

const LogoutButton = styled.button`
  background-color: #dc3545;
  color: white;
  border: none;
  padding: 5px 10px;
  cursor: pointer;
  border-radius: 5px;

  &:hover {
    background-color: #c82333;
  }
`;

const NavigationBar = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const user = useSelector(selectUser);

  const handleLogout = () => {
    dispatch(clearAuth());
    navigate("/");
  };

  return (
    <NavBar>
      <div>
        <NavLink to="/home">HOME</NavLink>
        <NavLink to="/profile">내 프로필</NavLink>
      </div>
      <UserInfo>
        <Avatar src={user?.avatar || "/default-img.png"} alt="User Avatar" />
        <UserName>{user?.username}</UserName>
        <LogoutButton onClick={handleLogout}>로그아웃</LogoutButton>
      </UserInfo>
    </NavBar>
  );
};

export default NavigationBar;
