import React from "react";
import { useLocation, useNavigate } from "react-router-dom";
import "bootstrap/dist/css/bootstrap.min.css";
import Button from "react-bootstrap/Button";

const NavList = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const goToLinkPage = (page) => {
    navigate(`${page}`);
  };
  return (
    <div className="nav-list">
      <Button
        variant={location.pathname === "/edittimetable" ? "primary" : "light"}
        onClick={() => goToLinkPage("/edittimetable")}
      >
        내 시간표
      </Button>
      <Button
        variant={location.pathname === "/commontimetable" ? "primary" : "light"}
        onClick={() => goToLinkPage("/commontimetable")}
      >
        공통 시간표
      </Button>
    </div>
  );
};

export default NavList;
