import React from "react";
import { Button, Card, Col } from "react-bootstrap";

const SongBox = ({ song }) => {
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
    <Col lg={3}>
      <Card>
        <Card.Body>
          <Card.Title style={{ textAlign: "center" }}>{song.name}</Card.Title>
          <Card.Text>
            {song.participantsId.map((id) => (
              <span>{allPeople[id]} </span>
            ))}
          </Card.Text>
          <Button variant="primary">Go somewhere</Button>
        </Card.Body>
      </Card>
    </Col>
  );
};

export default SongBox;
