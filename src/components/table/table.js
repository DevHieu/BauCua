import React, { useState } from "react";
import styles from "./table.module.scss";
import ChooseButton from "./ChooseButton/ChooseButton";

export default function Table() {
  const player = "hieu";
  const [choose, setChoose] = useState("");

  return (
    <div className={styles.wrapper}>
      <div className={styles.button}>
        <ChooseButton
          animal="nai"
          name={player}
          sendToParent={setChoose}
          chooseAnimal={choose}
        />
        <ChooseButton
          animal="bau"
          name={player}
          sendToParent={setChoose}
          chooseAnimal={choose}
        />
        <ChooseButton
          animal="ga"
          name={player}
          sendToParent={setChoose}
          chooseAnimal={choose}
        />
        <ChooseButton
          animal="ca"
          name={player}
          sendToParent={setChoose}
          chooseAnimal={choose}
        />
        <ChooseButton
          animal="cua"
          name={player}
          sendToParent={setChoose}
          chooseAnimal={choose}
        />
        <ChooseButton
          animal="tom"
          name={player}
          sendToParent={setChoose}
          chooseAnimal={choose}
        />
      </div>
      <img src="/img/BanBauCua.png" alt="baucua" className={styles.table} />
    </div>
  );
}
