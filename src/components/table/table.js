import React, { useEffect, useState } from "react";
import useDidMountEffect from "../../hooks/useDidMountEffect";
import styles from "./table.module.scss";
import ChooseButton from "./ChooseButton/ChooseButton";

export default function Table({
  socket,
  roomId,
  money,
  setMoney,
  userName,
  choose,
  clear,
  shuffle,
}) {
  const [chooseList, setChooseList] = useState([]);
  const dices = ["nai", "bau", "ga", "ca", "cua", "tom"];

  useDidMountEffect(() => {
    if (shuffle) {
      setTimeout(() => setChooseList([]), 11000);
    }
  }, [shuffle]);

  useEffect(() => {
    socket.on("start_Shuffle_toClient", (data) => {
      setTimeout(() => {
        setChooseList([]);
      }, 10000);
    });
  }, [socket]);

  useEffect(() => {
    socket.on("reset_board", () => {
      setChooseList([]);
    });
  }, [socket]);

  useDidMountEffect(() => {
    choose(chooseList);
  }, [choose, chooseList]);

  return (
    <div className={styles.wrapper}>
      <div className={styles.button}>
        {dices.map((animal, index) => (
          <ChooseButton
            key={index}
            animal={animal}
            socket={socket}
            roomId={roomId}
            userName={userName}
            money={money}
            setMoney={setMoney}
            chooseList={setChooseList}
            clearHistory={clear}
            shuffle={shuffle}
          />
        ))}
      </div>
      <img src="/img/BanBauCua.png" alt="baucua" className={styles.table} />
    </div>
  );
}
