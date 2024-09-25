import { useEffect, useState } from "react";
import { Button, Form, Modal } from "react-bootstrap";

const EditSongModal = ({
  song,
  showEditModal,
  handleEditModalClose,
  fetchSong,
}) => {
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
  const [editparticipantsId, setEditParticipantsId] = useState([]);
  const [editSong, setEditSong] = useState("");
  const [editSinger, setEditSinger] = useState("");
  const [editPerformance, setEditPerformance] = useState("");
  const [editPerformanceDate, setEditPerformanceDate] = useState("");

  useEffect(() => {
    setEditSong(song.name);
    setEditSinger(song.singer);
    setEditPerformance(song.performance);
    setEditPerformanceDate(song.performanceDate);
    setEditParticipantsId(song.participantsId);
  }, []);

  const EditParticipantsId = (id) => {
    if (editparticipantsId.some((item) => item == id)) {
      let temp = [...editparticipantsId];
      temp = temp.filter((item) => item !== id);
      setEditParticipantsId(temp);
    } else {
      setEditParticipantsId([...editparticipantsId, id]);
    }
  };

  const handleEditSong = async () => {
    try {
      let url = `http://localhost:4000/songs/${song.id}`;
      let response = await fetch(url, {
        method: "PATCH",
        headers: { "Content-type": "application/json" },
        body: JSON.stringify({
          name: editSong,
          singer: editSinger,
          performance: editPerformance,
          performanceDate: editPerformanceDate,
          participantsId: editparticipantsId,
        }),
      });
    } catch (e) {
      console.log("서버에 곡을 UPDATE하는 도중 오류 발생", e);
    }
    fetchSong();
    handleEditModalClose();
  };

  return (
    <Modal
      show={showEditModal}
      onHide={() => {
        handleEditModalClose();
      }}
    >
      <Modal.Header closeButton>
        <Modal.Title>곡 수정하기</Modal.Title>
      </Modal.Header>
      <Modal.Body>
        <Form.Group className="mb-3">
          <Form.Label>곡 제목</Form.Label>
          <Form.Control
            placeholder="곡 제목을 입력하시오"
            value={editSong}
            onChange={(e) => setEditSong(e.target.value)}
          />
        </Form.Group>
        <Form.Group className="mb-3">
          <Form.Label>가수</Form.Label>
          <Form.Control
            placeholder="가수를 입력하시오"
            value={editSinger}
            onChange={(e) => setEditSinger(e.target.value)}
          />
        </Form.Group>
        <Form.Group className="mb-3">
          <Form.Label>공연</Form.Label>
          <Form.Control
            placeholder="공연를 입력하시오"
            value={editPerformance}
            onChange={(e) => setEditPerformance(e.target.value)}
          />
        </Form.Group>
        <Form.Group className="mb-3">
          <Form.Label>공연 날짜</Form.Label>
          <Form.Control
            type="date"
            placeholder="공연 날짜를 선택하시오"
            value={editPerformanceDate}
            onChange={(e) => setEditPerformanceDate(e.target.value)}
          />
        </Form.Group>
        <Form.Group className="mb-3">
          {allPeople.map((item, index) => (
            <Button
              variant={
                editparticipantsId.some((id) => id == index)
                  ? "primary"
                  : "light"
              }
              onClick={() => EditParticipantsId(index)}
            >
              {item}
            </Button>
          ))}
        </Form.Group>
      </Modal.Body>
      <Modal.Footer
        style={{
          display: "flex",
          justifyContent: "space-between",
        }}
      >
        <div>
          {" "}
          <Button variant="danger">삭제</Button>
        </div>
        <div style={{ display: "flex", gap: "5px" }}>
          <Button
            variant="secondary"
            onClick={() => {
              handleEditModalClose();
            }}
          >
            닫기
          </Button>
          <Button
            variant="primary"
            onClick={() => {
              handleEditSong();
            }}
          >
            수정하기
          </Button>
        </div>
      </Modal.Footer>
    </Modal>
  );
};

export default EditSongModal;
