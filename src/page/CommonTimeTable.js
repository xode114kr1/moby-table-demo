import React, { useEffect, useState } from "react";
import { Button, Table } from "react-bootstrap";
import "bootstrap/dist/css/bootstrap.min.css";

const CommonTimeTable = ({ song }) => {
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
  const [groupMemberId, setGroupMemberId] = useState([]);
  const [schedule, setSchedule] = useState([[], [], [], [], [], [], []]);

  const addPeopleId = (person) => {
    if (groupMemberId.some((member) => member === person)) {
      let tempMember = [...groupMemberId];
      tempMember = tempMember.filter((member) => member !== person);
      setGroupMemberId(tempMember);
    } else {
      setGroupMemberId([...groupMemberId, person]);
    }
  };

  const addCommonSchedule = async () => {
    let tempSchedule = [[], [], [], [], [], [], []];

    const fetchPromises = groupMemberId.map(async (memberId) => {
      let url = `http://localhost:4000/people/${memberId}`;
      let response = await fetch(url);
      let data = await response.json();
      let addSchedule = data.schedule;

      for (let i = 0; i < addSchedule.length; i++) {
        tempSchedule[i] = [...tempSchedule[i], ...addSchedule[i]];
        const tempset = new Set(tempSchedule[i]);
        tempSchedule[i] = [...tempset];
        tempSchedule[i].sort((a, b) => a - b);
      }
    });

    await Promise.all(fetchPromises);

    setSchedule(tempSchedule);
  };

  useEffect(() => {
    if (song) {
      setGroupMemberId(song.participantsId);
    }
  }, []);

  useEffect(() => {
    addCommonSchedule();
  }, [groupMemberId]);

  return (
    <div className="edit-table-page-contanier">
      <div className="table-contanier">
        <div className="name-list">
          {allPeople.map((person, index) => (
            <Button
              variant={
                groupMemberId.some((member) => member === index)
                  ? "primary"
                  : "light"
              }
              key={index}
              onClick={() => addPeopleId(index)}
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

export default CommonTimeTable;
