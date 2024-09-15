import React, { useEffect } from "react";
import { Button, Container, Table } from "react-bootstrap";
import { useState } from "react";
import "bootstrap/dist/css/bootstrap.min.css";

const EditTimeTable = ({ myId }) => {
  let tempSchedule = [];

  const daysOfWeek = ["Mon", "Tue", "Wed", "Thu", "Fri", "Sat", "Sun"];
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
  const [doEdit, setDoEdit] = useState(false);
  const [schedule, setSchedule] = useState([[], [], [], [], [], [], []]);
  const [peopleId, setPeopleId] = useState(myId);

  const fetchSchedule = async (id) => {
    // console.log(id);
    try {
      let url = `http://localhost:4000/people/${id}`;
      let response = await fetch(url);
      let data = await response.json();
      setSchedule(data.schedule);
    } catch (error) {
      console.error("Error fetching data", error);
    }
  };

  const patchSchedule = async () => {
    // console.log(schedule);
    try {
      let url = `http://localhost:4000/people/${peopleId}`;
      let response = await fetch(url, {
        method: "PATCH",
        headers: {
          "Content-type": "application/json",
        },
        body: JSON.stringify({ schedule }),
      });
    } catch (error) {
      console.error("Error patching data:", error);
    }
  };

  useEffect(() => {
    fetchSchedule(peopleId);
  }, [peopleId]);

  const times = [
    "08:00",
    "08:30",
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
    console.log(allPeople[peopleId], schedule);
  };

  const clickEditButton = () => {
    setDoEdit(!doEdit);
    if (doEdit === true) patchSchedule();
  };

  return (
    <div className="edit-table-page-contanier">
      <div className="button-contanier">
        <Button
          onClick={clickEditButton}
          variant={doEdit ? "danger" : "primary"}
        >
          {doEdit ? "저장" : "수정"}
        </Button>
        <Button onClick={clickPrintScheduleButton}>출력</Button>
      </div>

      <div className="table-contanier">
        <div className="name-list">
          {allPeople.map((person, index) => (
            <Button
              variant={allPeople[peopleId] === person ? "primary" : "light"}
              key={index}
              onClick={() => setPeopleId(index)}
            >
              {person}
            </Button>
          ))}
        </div>
        <Table bordered>
          <thead className="schedule-thead">
            <tr>
              <th>time</th>
              {daysOfWeek.map((day, index) => (
                <th key={index}>{day}</th>
              ))}
            </tr>
          </thead>
          <tbody>
            {times.map((time, rowId) => (
              <tr key={rowId} className="schedule-tr">
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
