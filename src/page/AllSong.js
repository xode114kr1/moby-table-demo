import React, { useEffect, useState } from "react";
import { Button } from "react-bootstrap";

const AllSong = () => {
  const [songs, setSongs] = useState(null);

  const fetchSong = async () => {
    try {
      let url = "http://localhost:4000/songs";
      let response = await fetch(url);
      let date = await response.json();
      console.log(date);
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
        <Button>추가</Button>
      </div>
    </div>
  );
};

export default AllSong;
