import React, { useState } from "react";
import styles from "./Login.module.scss";

export default function Login({ socket, RoomId, UserName, isLogin }) {
  const [id, setId] = useState("");
  const [name, setName] = useState("");

  const joinRoom = () => {
    if (id !== "" && name !== "") {
      socket.emit("join_room", { id: id, name: name });
      socket.on("room_joined", () => {
        RoomId(id);
        UserName(name);
        isLogin(true);
      });
      socket.on("room_not_found", () => {
        alert("Room not found");
      });
      setName("");
      setId("");
    }
  };

  const createRoom = () => {
    if (name !== "") {
      const ramdomId = Math.floor(Math.random() * 1000000).toString();
      socket.emit("create_room", { id: ramdomId, name: name });
      UserName(name);
      isLogin(true);
      RoomId(ramdomId);
      setName("");
      setId("");
    }
  };
  return (
    <div className={styles.wrapper}>
      <img className={styles.logo} src="/img/logo.png" alt="logo" />
      <input
        type="text"
        placeholder="name"
        value={name}
        onChange={(event) => {
          setName(event.target.value);
        }}
      />
      <button onClick={createRoom}>Create room</button>
      <p>or Join room</p>

      <input
        type="text"
        placeholder="id"
        value={id}
        onChange={(event) => {
          setId(event.target.value);
        }}
      />
      <button onClick={joinRoom}>Join room</button>
    </div>
  );
}
