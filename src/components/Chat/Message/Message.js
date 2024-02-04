import React from "react";
import styles from "./Mesage.module.scss";

export default function Message({ text, player }) {
  return (
    <div className={styles.wrapper}>
      {player}: {text}
    </div>
  );
}
