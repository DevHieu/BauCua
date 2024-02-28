import React, { useState } from "react";
import styles from "./table.module.scss";
import ChooseButton from "./ChooseButton/ChooseButton";

export default function Table({ socket, roomId, userName }) {
  const player = "hieu";
  const [choose, setChoose] = useState("");

  return (
    <div className={styles.wrapper}>
      <div className={styles.button}>
        <ChooseButton
          animal="nai"
          socket={socket}
          roomId={roomId}
          userName={userName}
        />
        <ChooseButton
          animal="bau"
          socket={socket}
          roomId={roomId}
          userName={userName}
        />
        <ChooseButton
          animal="ga"
          socket={socket}
          roomId={roomId}
          userName={userName}
        />
        <ChooseButton
          animal="ca"
          socket={socket}
          roomId={roomId}
          userName={userName}
        />
        <ChooseButton
          animal="cua"
          socket={socket}
          roomId={roomId}
          userName={userName}
        />
        <ChooseButton
          animal="tom"
          socket={socket}
          roomId={roomId}
          userName={userName}
        />
      </div>
      <img src="/img/BanBauCua.png" alt="baucua" className={styles.table} />
    </div>
  );
}
