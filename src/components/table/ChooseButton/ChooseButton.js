import React, { useEffect, useState } from "react";
import useDidMountEffect from "../../../hooks/useDidMountEffect";
import styles from "./ChooseButton.module.scss";

export default function ChooseButton({
  animal,
  socket,
  roomId,
  userName,
  money,
  setMoney,
  chooseList,
  clearHistory,
  shuffle,
}) {
  const [choose, setChoose] = useState([]);
  const [playerChoose, setPlayerChoose] = useState(false);
  const [isShuffle, setIsShuffle] = useState(false);

  const handleChoose = async () => {
    setPlayerChoose(!playerChoose);
    if (choose.includes(userName) === false) {
      if (money !== 0) {
        setChoose((list) => [...list, userName]);
        chooseList((list) => [...list, animal]);
        setMoney(money - 100);
      }
    } else {
      setChoose((list) => list.filter((item) => item !== userName));
      chooseList((list) => list.filter((item) => item !== animal));
      setMoney(money + 100);
    }
    const ChooseData = {
      room: roomId,
      user: userName,
      animal: animal,
    };

    await socket.emit("user_choose", ChooseData);
  };

  useEffect(() => {
    socket
      .off("receive_choose" + animal)
      .on("receive_choose" + animal, (data) => {
        //select or not selected
        if (choose.includes(data) === false) {
          setChoose((list) => [...list, data]);
        } else {
          setChoose((list) => list.filter((item) => item !== data));
        }
      });
  }, [socket, choose, animal]);

  useEffect(() => {
    socket.on("start_Shuffle_toClient", (data) => {
      setIsShuffle(data);
      setTimeout(() => {
        setIsShuffle(false);
        setChoose([]);
        setPlayerChoose(false);
      }, 10000);
    });
  }, [socket]);

  //clear player choice list
  useDidMountEffect(() => {
    if (clearHistory) {
      setChoose([]);
      setPlayerChoose(false);
    }
  }, [clearHistory]);

  useDidMountEffect(() => {
    if (shuffle) {
      setIsShuffle(true);
      setTimeout(() => {
        setIsShuffle(false);
        setChoose([]);
        setPlayerChoose(false);
      }, 10000);
    }
  }, [shuffle]);

  return (
    <button
      disabled={isShuffle}
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
