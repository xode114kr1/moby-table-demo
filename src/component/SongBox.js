import React from "react";
import { Button, Card, Col } from "react-bootstrap";
import { useNavigate } from "react-router-dom";

const SongBox = ({ song }) => {
  const navigate = useNavigate();
  const goToCommonTimeTable = (song) => {
    navigate("/commontimetable", { state: { song } });
  };

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
    <Col xs={12} md={6} xl={3}>
      <Card>
        <Card.Body>
          <Card.Title style={{ textAlign: "center" }}>{song.name}</Card.Title>
          <Card.Text>
            <div style={{ textAlign: "center" }}>
              {song.participantsId.map((id, index) => (
                <span key={id}>
                  {allPeople[id]} {/* 문자열 출력 */}
                  {index === 2 && <br />} {/* index가 3일 때 줄바꿈 */}
                </span>
              ))}
            </div>
          </Card.Text>
          <Button
            variant="success"
            style={{ width: "100%" }}
            onClick={() => goToCommonTimeTable(song)}
          >
            공통 시간표
          </Button>
        </Card.Body>
      </Card>
    </Col>
  );
};

export default SongBox;
