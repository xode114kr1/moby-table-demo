import React from "react";
import { Button, Container, Table } from "react-bootstrap";
import { useState } from "react";
import "bootstrap/dist/css/bootstrap.min.css";

const EditTimeTable = () => {
  let tempSchedule = [];

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
  ];
  const [doEdit, setDoEdit] = useState(false);
  const [schedule, setSchedule] = useState([[], [], [], [], [], [], []]);

  const times = [
    "08:00",
    "09:00",
    "09:00",
    "09:30",
    "10:00",
    "10:30",
    "11:00",
    "11:30",
    "12:00",
    "12:30",
    "13:00",
    "13:30",
    "14:00",
    "14:30",
    "15:00",
    "15:30",
    "16:00",
    "16:30",
    "17:00",
    "17:30",
    "18:00",
    "18:30",
    "19:00",
    "19:30",
    "20:00",
    "20:30",
    "21:00",
    "21:30",
    "22:00",
    "22:30",
    "23:00",
    "23:30",
  ];

  const handleSchedule = (col, row) => {
    if (doEdit) {
      tempSchedule = [...schedule];
      if (tempSchedule[col].includes(row)) {
        tempSchedule[col] = tempSchedule[col].filter((item) => item !== row);
      } else {
        tempSchedule[col].push(row);
      }
      tempSchedule[col].sort((a, b) => a - b);
      setSchedule(tempSchedule);
    }
  };

  const clickPrintScheduleButton = () => {
    console.log(schedule);
  };

  const clickEditButton = () => {
    setDoEdit(!doEdit);
  };

  return (
    <div className="edit-table-page-contanier">
      <div className="button-contanier">
        <Button onClick={clickEditButton}>{doEdit ? "수정" : "저장"}</Button>
        <Button onClick={clickPrintScheduleButton}>출력</Button>
      </div>

      <div className="table-contanier">
        <Table bordered>
          <thead>
            <tr>
              <th>time</th>
              {daysOfWeek.map((day, index) => (
                <th key={index}>{day}</th>
              ))}
            </tr>
          </thead>
          <tbody>
            {times.map((time, rowId) => (
              <tr key={rowId}>
                <td>{time}</td>
                {daysOfWeek.map((day, colId) => (
                  <td
                    className="data-cell"
                    key={colId}
                    onClick={() => handleSchedule(colId, rowId)}
                    style={{
                      backgroundColor: schedule[colId].includes(rowId)
                        ? "lightblue"
                        : "white",
                    }}
                  ></td>
                ))}
              </tr>
            ))}
          </tbody>
        </Table>
      </div>
    </div>
  );
};

export default EditTimeTable;
