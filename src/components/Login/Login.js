import React, { useState } from "react";
import styles from "./Login.module.scss";

export default function Login({ RoomId, UserName, isLogin }) {
  const [id, setId] = useState("");
  const [name, setName] = useState("");

  const joinRoom = () => {
    if (id !== "" && name !== "") {
      RoomId(id);
      UserName(name);
      isLogin(true);
    }
  };
  return (
    <div className={styles.wrapper}>
      <input
        type="text"
        placeholder="id"
        onChange={(event) => {
          setId(event.target.value);
        }}
      />
      <input
        type="text"
        placeholder="name"
        onChange={(event) => {
          setName(event.target.value);
        }}
      />
      <button onClick={joinRoom}>join</button>
    </div>
  );
}
