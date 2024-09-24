import React, { useEffect, useState } from "react";
import { Alert, Button, Col, Form, Modal, Row } from "react-bootstrap";
import SongBox from "../component/SongBox";
import AddSongModal from "../component/AddSongModal";

const AllSong = () => {
  const [songs, setSongs] = useState(null);
  const [showAddModal, setShowAddModal] = useState(false);

  const handleAddModalClose = () => setShowAddModal(false);
  const handleAddModalShow = () => setShowAddModal(true);

  const fetchSong = async () => {
    try {
      let url = "http://localhost:4000/songs";
      let response = await fetch(url);
      let data = await response.json();
      setSongs(data);
    } catch {
      console.log("server로 부터 데이터를 입력받지 못하였습니다");
    }
  };

  useEffect(() => {
    fetchSong();
  }, []);

  return (
    <div className="all-song-page">
      <div className="all-song-button-div">
        <Button variant="primary" onClick={handleAddModalShow}>
          추가
        </Button>
        <AddSongModal
          showAddModal={showAddModal}
          handleAddModalClose={handleAddModalClose}
          fetchSong={fetchSong}
        />
      </div>
      <div className="song-contanier-div">
        <Row>
          {songs?.map((song) => (
            <SongBox song={song} />
          ))}
        </Row>
      </div>
    </div>
  );
};

export default AllSong;
