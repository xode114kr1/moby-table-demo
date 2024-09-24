import React from "react";
import { Modal, Button } from "react-bootstrap";

const BasicModal = ({ show, handleClose, song = null }) => {
  return (
    <Modal show={show} onHide={handleClose}>
      <Modal.Header closeButton>
        <Modal.Title>Modal Title</Modal.Title>
      </Modal.Header>
      <Modal.Body>
        {song == null ? "널" : song.name}
        {/* 여기는 빈 모달입니다. 필요에 따라 내용을 추가하세요. */}
      </Modal.Body>
      <Modal.Footer>
        <Button variant="secondary" onClick={handleClose}>
          Close
        </Button>
        <Button variant="primary" onClick={handleClose}>
          Save Changes
        </Button>
      </Modal.Footer>
    </Modal>
  );
};

export default BasicModal;
