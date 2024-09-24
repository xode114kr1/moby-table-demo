import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faBars } from "@fortawesome/free-solid-svg-icons/faBars";
import React, { useState } from "react";
import { Button, Card, Col, Row } from "react-bootstrap";
import { useNavigate } from "react-router-dom";

const SongBox = ({ song }) => {
  const [menuOpen, setMenuOpen] = useState(false);
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
        <Card.Header style={{ fontSize: "20px" }}>
          <Row>
            <Col></Col>
            <Col style={{ textAlign: "center" }}>{song.name}</Col>
            <Col
              style={{
                display: "flex",
                justifyContent: "flex-end",
                alignItems: "center",
              }}
            >
              <FontAwesomeIcon
                icon={faBars}
                onClick={() => setMenuOpen(!menuOpen)}
              />
              {menuOpen && (
                <div className="song-control-menu-list">
                  <Button variant="light">수정</Button>
                  <Button variant="light">삭제</Button>
                </div>
              )}
            </Col>
          </Row>
        </Card.Header>
        <Card.Body style={{ paddingTop: "0px" }}>
          <Card.Text
            style={{
              display: "flex",
              justifyContent: "flex-end",
              gap: "10px",
              padding: "3px",
              fontSize: "14px",
              marginBottom: "5px",
            }}
          >
            <div>{song.performanceDate}</div>
            <div>{song.performance}</div>
          </Card.Text>
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
