import React, { useState, useEffect } from "react";
import styles from "./ChooseButton.module.scss";

export default function ChooseButton({ animal, socket, roomId, userName }) {
  const [choose, setChoose] = useState([]);
  const [playerChoose, setPlayerChoose] = useState(false);

  const handleChoose = async () => {
    setPlayerChoose(!playerChoose);
    if (choose.includes(userName) === false) {
      setChoose((list) => [...list, userName]);
    } else {
      setChoose((list) => list.filter((item) => item !== userName));
    }
    const ChooseData = {
      room: roomId,
      user: userName,
      animal: animal,
    };

    await socket.emit("user_choose_" + animal, ChooseData);
  };

  useEffect(() => {
    socket
      .off("receive_choose" + animal)
      .on("receive_choose" + animal, (data) => {
        if (choose.includes(data) === false) {
          setChoose((list) => [...list, data]);
        } else {
          setChoose((list) => list.filter((item) => item !== data));
        }
      });
  }, [socket, choose]);

  return (
    <button
      onClick={handleChoose}
      className={
        playerChoose ? `${styles.wrapper} ${styles.choose}` : styles.wrapper
      }
    >
      {choose.map((value, index) => {
        return <h4 key={index}>{value}</h4>;
      })}
    </button>
  );
}
