import React, { useEffect, useState } from "react";
import { Alert, Button, Col, Form, Modal, Row } from "react-bootstrap";
import SongBox from "../component/SongBox";

const AllSong = () => {
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
  const [maxId, setMaxId] = useState(0);
  const [addSong, setAddSong] = useState("");
  const [addSinger, setAddSinger] = useState("");
  const [addparticipantsId, setAddParticipantsId] = useState([]);
  const [songs, setSongs] = useState(null);
  const [show, setShow] = useState(false);

  const handleClose = () => setShow(false);
  const handleShow = () => setShow(true);

  const fetchSong = async () => {
    try {
      let url = "http://localhost:4000/songs";
      let response = await fetch(url);
      let data = await response.json();
      setSongs(data);
      // console.log(data);
    } catch {
      console.log("server로 부터 데이터를 입력받지 못하였습니다");
    }
  };

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
      setShow(false);
      await patchAddSong();
    }
  };

  const patchAddSong = async () => {
    const newSong = {
      id: maxId + 1,
      name: addSong,
      singer: addSinger,
      participantsId: addparticipantsId,
    };
    try {
      let url = "http://localhost:4000/songs";
      let response = await fetch(url, {
        method: "POST",
        headers: { "Content-type": "application/json" },
        body: JSON.stringify(newSong),
      });
    } catch (error) {
      console.log("서버에 입력하는 중 오류가 발생하였습니다", error);
    }
  };

  useEffect(() => {
    fetchSong();
    fetch("http://localhost:4000/songs")
      .then((response) => response.json())
      .then((data) => {
        const maxId = data.reduce((max, item) => Math.max(max, item.id), 0);
        console.log(maxId);
        setMaxId(maxId);
      });
  }, []);

  return (
    <div className="all-song-page">
      <div className="all-song-button-div">
        <Button variant="primary" onClick={handleShow}>
          추가
        </Button>

        <Modal show={show} onHide={handleClose}>
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
            <Button variant="secondary" onClick={handleClose}>
              닫기
            </Button>
            <Button variant="primary" onClick={(e) => handleAddSong(e)}>
              추가하기
            </Button>
          </Modal.Footer>
        </Modal>
      </div>
      <div className="song-contanier-div">
        <Row>
          {songs.map((song) => (
            <SongBox song={song} />
          ))}
        </Row>
      </div>
    </div>
  );
};

export default AllSong;
