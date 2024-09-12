import EditTimeTable from "./page/EditTimeTable";
import { Route, Routes } from "react-router-dom";
import "./App.css";
import Header from "./component/Header";
import NavList from "./component/NavList";
import CommonTimeTable from "./page/CommonTimeTable";

function App() {
  const daysOfWeek = [
    "Monday",
    "Tuesday",
    "Wednesday",
    "Thursday",
    "Friday",
    "Saturday",
    "Sunday",
  ];
  const allPeople = [
    "진정환",
    "진경원",
    "이경민",
    "김준환",
    "박종혁",
    "신경원",
    "윤정빈",
    "장훈석",
    "박재성",
    "조형준",
    "김태윤",
    "김석준",
    "김태은",
    "김병건",
    "신윤호",
    "정지호",
    "강세진",
  ];
  return (
    <div className="app">
      <Header />
      <div className="content-contanier">
        <NavList />
        <div className="content-div">
          <Routes>
            <Route path="/edittimetable" element={<EditTimeTable />} />
            <Route path="/commontimetable" element={<CommonTimeTable />} />
          </Routes>
        </div>
      </div>
    </div>
  );
}

export default App;
