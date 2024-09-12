import React from "react";
import { useLocation, useNavigate } from "react-router-dom";

const NavList = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const goToLinkPage = (page) => {
    navigate(`${page}`);
    console.log(location);
  };
  return (
    <div className="nav-list">
      <button onClick={() => goToLinkPage("/edittimetable")}>내 시간표</button>
      <button>시간표 공유</button>
      <button>내 시간표</button>
      <button>내 시간표</button>
      <button>내 시간표</button>
    </div>
  );
};

export default NavList;
