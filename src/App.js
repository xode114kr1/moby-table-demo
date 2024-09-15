import EditTimeTable from "./page/EditTimeTable";
import { Route, Routes } from "react-router-dom";
import Header from "./component/Header";
import NavList from "./component/NavList";
import CommonTimeTable from "./page/CommonTimeTable";
import "./App.css";
import { useState } from "react";

function App() {
  const [myId, setMyId] = useState("14");
  return (
    <div className="app">
      <Header />
      <div className="content-contanier">
        <NavList />
        <div className="content-div">
          <Routes>
            <Route
              path="/edittimetable"
              element={<EditTimeTable myId={myId} />}
            />
            <Route path="/commontimetable" element={<CommonTimeTable />} />
          </Routes>
        </div>
      </div>
    </div>
  );
}

export default App;
