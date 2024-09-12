import React from "react";
import logoImg from "../media/to.png";
import { useNavigate } from "react-router-dom";

const Header = () => {
  const navigate = useNavigate();
  const goToHome = () => {
    navigate("/");
  };
  return (
    <div className="header">
      <img src={logoImg} width="150px" onClick={goToHome} />
      <div>로그인</div>
    </div>
  );
};

export default Header;
