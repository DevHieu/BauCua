import React, { useEffect, useState } from "react";
import useDidMountEffect from "../../hooks/useDidMountEffect";
import { CiMedal } from "react-icons/ci";
import styles from "./ScoreBoard.module.scss";

export default function ScoreBoard({ socket, roomId, shuffle }) {
  const [isShow, setIsShow] = useState(false);
  const [first, setFirst] = useState("");
  const [second, setSecond] = useState("");
  const [third, setThird] = useState("");
  const [fourth, setFourth] = useState("");
  const [fifth, setFifth] = useState("");

  //handle show player in score board
  const handleShowPlayers = (user) => {
    for (let i = 0; i < user.length; i++) {
      switch (i) {
        case 0:
          setFirst(`${user[i].name} - ${user[i].money}$`);
          break;
        case 1:
          setSecond(`${user[i].name} - ${user[i].money}$`);
          break;
        case 2:
          setThird(`${user[i].name} - ${user[i].money}$`);
          break;
        case 3:
          setFourth(`${user[i].name} - ${user[i].money}$`);
          break;
        case 4:
          setFifth(`${user[i].name} - ${user[i].money}$`);
          break;
        default:
          break;
      }
    }
    if (user.length < 5) {
      for (let i = user.length; i < 5; i++) {
        switch (i) {
          case 0:
            setFirst("");
            break;
          case 1:
            setSecond("");
            break;
          case 2:
            setThird("");
            break;
          case 3:
            setFourth("");
            break;
          case 4:
            setFifth("");
            break;
          default:
            break;
        }
      }
    }
  };

  const compare = (a, b) => {
    if (a.money < b.money) {
      return 1;
    }
    if (a.money > b.money) {
      return -1;
    }
    return 0;
  };

  useEffect(() => {
    socket.on("get_player_toClient", (data) => {
      console.log(data);
      setTimeout(async () => {
        if (Array.isArray(data)) {
          await data.sort(compare);
          await handleShowPlayers(data);
        } else {
          console.error("Data received is not an array:", data);
        }
      }, 3000);
    });
  }, [socket]);

  useDidMountEffect(() => {
    setTimeout(() => {
      socket.emit("get_player", roomId);
    }, 10000);
  }, [shuffle]);

  useEffect(() => {
    socket.on("reset_board", () => {
      setFirst("");
      setSecond("");
      setThird("");
      setFourth("");
      setFifth("");
    });
  }, [socket]);

  return (
    <div className={styles.wrapper}>
      <div className={styles.pcUi}>
        <div className={styles.scoreBoard__title}>
          <h3>Score Board</h3>
        </div>
        <div className={styles.scoreBoard__content}>
          <div
            className={`${styles.scoreBoard__content__item} ${styles.first}`}
          >
            <span>1st: {first}</span>
          </div>
          <div
            className={`${styles.scoreBoard__content__item} ${styles.second}`}
          >
            <span>2nd: {second}</span>
          </div>
          <div
            className={`${styles.scoreBoard__content__item} ${styles.third}`}
          >
            <span>3rd: {third}</span>
          </div>
          <div className={styles.scoreBoard__content__item}>
            <span>4th: {fourth}</span>
          </div>
          <div className={styles.scoreBoard__content__item}>
            <span>5th: {fifth}</span>
          </div>
        </div>
      </div>
      <div className={styles.mobileUi}>
        <div
          className={isShow ? `${styles.icon} ${styles.extand} ` : styles.icon}
          onClick={() => setIsShow(!isShow)}
        >
          <CiMedal size={32} />
        </div>
        <div
          className={
            isShow ? `${styles.valid} ${styles.invalid} ` : styles.valid
          }
        ></div>
        <div
          className={
            isShow ? `${styles.scoreBoard} ${styles.extand}` : styles.scoreBoard
          }
        >
          <div className={styles.scoreBoard__title}>
            <h3>Score Board</h3>
          </div>
          <div className={styles.scoreBoard__content}>
            <div
              className={`${styles.scoreBoard__content__item} ${styles.first}`}
            >
              <span>1st: {first}</span>
            </div>
            <div
              className={`${styles.scoreBoard__content__item} ${styles.second}`}
            >
              <span>2nd: {second}</span>
            </div>
            <div
              className={`${styles.scoreBoard__content__item} ${styles.third}`}
            >
              <span>3rd: {third}</span>
            </div>
            <div className={styles.scoreBoard__content__item}>
              <span>4th: {fourth}</span>
            </div>
            <div className={styles.scoreBoard__content__item}>
              <span>5th: {fifth}</span>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
