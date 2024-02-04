/* eslint-disable react-hooks/exhaustive-deps */
import React, { useState, useEffect } from "react";
import styles from "./Dice.module.scss";

export default function Dice() {
  const [animation, isAnimation] = useState(false);
  const dices = ["bau", "ca", "cua", "ga", "nai", "tom"];
  const [dice1, setDice1] = useState(Math.floor(Math.random() * 6));
  const [dice2, setDice2] = useState(Math.floor(Math.random() * 6));
  const [dice3, setDice3] = useState(Math.floor(Math.random() * 6));

  useEffect(() => {
    handleAnimation();
  }, []);

  const handleAnimation = () => {
    isAnimation(true);

    setTimeout(() => {
      setDice1(Math.floor(Math.random() * 6));
      setDice2(Math.floor(Math.random() * 6));
      setDice3(Math.floor(Math.random() * 6));
    }, 5000);

    const time = setTimeout(() => {
      isAnimation(false);
    }, 10000);

    return () => clearTimeout(time);
  };

  return (
    <div className={styles.wrapper}>
      <button
        disabled={animation}
        onClick={handleAnimation}
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
          animation ? `${styles.plate} ${styles.plateAnimation}` : styles.plate
        }
      />
    </div>
  );
}

// dice1 = Math.floor(Math.random() * 6);
// dice2 = Math.floor(Math.random() * 6);
// dice3 = Math.floor(Math.random() * 6);
