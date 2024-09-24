import React, { useEffect, useState } from "react";
import { Button, Form, Modal } from "react-bootstrap";

const AddSongModal = ({ showAddModal, handleAddModalClose, fetchSong }) => {
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
  const [addSong, setAddSong] = useState("");
  const [addSinger, setAddSinger] = useState("");
  const [addPerformanceDate, setAddPerformanceDate] = useState("");
  const [addPerformance, setAddPerformance] = useState("");
  const [addparticipantsId, setAddParticipantsId] = useState([]);
  const [maxId, setMaxId] = useState(0);

  const addParticipantsId = (id) => {
    if (addparticipantsId.some((item) => item == id)) {
      let temp = [...addparticipantsId];
      temp = temp.filter((item) => item !== id);
      setAddParticipantsId(temp);
    } else {
      setAddParticipantsId([...addparticipantsId, id]);
    }
  };

  const handleAddSong = async (e) => {
    e.preventDefault();
    if (addSong === "") {
      alert("곡 제목을 입력하세요");
    } else if (addSinger === "") {
      alert("가수를 입력하세요");
    } else {
      setAddSong("");
      setAddSinger("");
      setAddParticipantsId([]);
      handleAddModalClose();
      await patchAddSong();
      fetchSong();
    }
  };

  const patchAddSong = async () => {
    const newSong = {
      id: maxId + 1,
      name: addSong,
      singer: addSinger,
      performance: addPerformance,
      performanceDate: addPerformanceDate,
      participantsId: addparticipantsId,
    };
    try {
      let url = "http://localhost:4000/songs";
      let response = await fetch(url, {
        method: "POST",
        headers: { "Content-type": "application/json" },
        body: JSON.stringify(newSong),
      });
      updateMaxId();
    } catch (error) {
      console.log("서버에 입력하는 중 오류가 발생하였습니다", error);
    }
  };

  const updateMaxId = () => {
    try {
      fetch("http://localhost:4000/songs")
        .then((response) => response.json())
        .then((data) => {
          const maxId = data.reduce((max, item) => Math.max(max, item.id), 0);
          console.log(maxId);
          setMaxId(maxId);
        });
    } catch (e) {
      console.log("데이터를 불러오는 중 오류가 발생", e);
    }
  };

  useEffect(() => {
    updateMaxId();
  }, []);

  return (
    <Modal show={showAddModal} onHide={handleAddModalClose}>
      <Modal.Header closeButton>
        <Modal.Title>곡 추가하기</Modal.Title>
      </Modal.Header>
      <Modal.Body>
        <Form.Group className="mb-3">
          <Form.Label>곡 제목</Form.Label>
          <Form.Control
            placeholder="곡 제목을 입력하시오"
            value={addSong}
            onChange={(e) => setAddSong(e.target.value)}
          />
        </Form.Group>
        <Form.Group className="mb-3">
          <Form.Label>가수</Form.Label>
          <Form.Control
            placeholder="가수를 입력하시오"
            value={addSinger}
            onChange={(e) => setAddSinger(e.target.value)}
          />
        </Form.Group>
        <Form.Group className="mb-3">
          <Form.Label>공연</Form.Label>
          <Form.Control
            placeholder="공연를 입력하시오"
            value={addPerformance}
            onChange={(e) => setAddPerformance(e.target.value)}
          />
        </Form.Group>
        <Form.Group className="mb-3">
          <Form.Label>공연 날짜</Form.Label>
          <Form.Control
            type="date"
            placeholder="공연 날짜를 선택하시오"
            value={addPerformanceDate}
            onChange={(e) => setAddPerformanceDate(e.target.value)}
          />
        </Form.Group>
        <Form.Group className="mb-3">
          {allPeople.map((item, index) => (
            <Button
              variant={
                addparticipantsId.some((id) => id == index)
                  ? "primary"
                  : "light"
              }
              onClick={() => addParticipantsId(index)}
            >
              {item}
            </Button>
          ))}
        </Form.Group>
      </Modal.Body>
      <Modal.Footer>
        <Button variant="secondary" onClick={handleAddModalClose}>
          닫기
        </Button>
        <Button variant="primary" onClick={(e) => handleAddSong(e)}>
          추가하기
        </Button>
      </Modal.Footer>
    </Modal>
  );
};

export default AddSongModal;
