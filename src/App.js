import EditTimeTable from "./page/EditTimeTable";
import { Route, Routes } from "react-router-dom";
import "./App.css";
import Header from "./component/Header";
import NavList from "./component/NavList";

function App() {
  return (
    <div className="app">
      <Header />
      <div className="content-contanier">
        <NavList />
        <div className="content-div">
          <Routes>
            <Route path="/edittimetable" element={<EditTimeTable />} />
          </Routes>
        </div>
      </div>
    </div>
  );
}

export default App;
