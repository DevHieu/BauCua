/* eslint-disable react-hooks/exhaustive-deps */
import React, { useState, useEffect, useRef } from "react";
import styles from "./Dice.module.scss";

export default function Dice({ socket, roomId, userName }) {
  const [press, isPress] = useState(false);
  const dices = ["bau", "ca", "cua", "ga", "nai", "tom"];
  const [dice1, setDice1] = useState(0);
  const [dice2, setDice2] = useState(0);
  const [dice3, setDice3] = useState(0);

  // const isMounted = useRef(false);

  // useEffect(() => {
  //   if (isMounted.current) {
  //     handleShuffle();
  //   } else {
  //     isMounted.current = true;
  //   }
  // }, []); // Empty dependency array ensures it only runs on mount and unmount

  const handleShuffle = () => {
    // when u click the button, it start shuffle and give the server data
    socket.emit("start_Shuffle", { room: roomId, isShuffle: true });
    isPress(true);

    setTimeout(() => {
      const dice = {
        dice1: Math.floor(Math.random() * 6),
        dice2: Math.floor(Math.random() * 6),
        dice3: Math.floor(Math.random() * 6),
      };

      socket.emit("random_dice", { room: roomId, dice: dice });
      setDice1(dice.dice1);
      setDice2(dice.dice2);
      setDice3(dice.dice3);
    }, 5000);

    setTimeout(() => {
      isPress(false);
    }, 10000);
  };

  useEffect(() => {
    socket.on("start_Shuffle_toClient", (data) => {
      isPress(data);

      setTimeout(() => {
        socket.on("random_dice_toClient", (data) => {
          console.log(data);
          setDice1(data.dice1);
          setDice2(data.dice2);
          setDice3(data.dice3);
        });
      }, 5000);

      setTimeout(() => {
        isPress(false);
      }, 10000);
    });
  }, [socket]);

  return (
    <div className={styles.wrapper}>
      <button
        disabled={press}
        onClick={handleShuffle}
        className={styles.shuffle}
      >
        Shuffle
      </button>
      <div className={styles.bowlDice}>
        <img src="/img/bowl.png" alt="bowl" className={styles.bowl} />
        <div className={styles.dices}>
          <img
            src={`/img/${dices[dice1]}.png`}
            alt=""
            className={styles.dice}
          />
          <img
            src={`/img/${dices[dice2]}.png`}
            alt=""
            className={styles.dice}
          />
          <img
            src={`/img/${dices[dice3]}.png`}
            alt=""
            className={styles.dice}
          />
        </div>
      </div>
      <img
        src="/img/plate.png"
        alt="plate"
        className={
          press ? `${styles.plate} ${styles.plateAnimation}` : styles.plate
        }
      />
    </div>
  );
}
