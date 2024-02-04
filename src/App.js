import React, { useEffect, useState } from "react";
import io from "socket.io-client";

import Table from "./components/table/table";
import Dice from "./components/dice/Dice";
import Chat from "./components/Chat/Chat";
import Login from "./components/Login/Login";
import "./App.scss";

const socket = io.connect("http://localhost:8000");

function App() {
  const [room, setRoom] = useState("");
  const [name, setName] = useState("");
  const [isLogin, setIsLogin] = useState(false);

  useEffect(() => {
    console.log(room, name, isLogin);
    if (isLogin) {
      socket.emit("join_room", room);
    }
  }, [room, name, isLogin]);
  return (
    <div className="App">
      <div className={isLogin ? "join_room hidden" : "join_room"}>
        <Login RoomId={setRoom} UserName={setName} isLogin={setIsLogin} />
      </div>
      <div className={!isLogin ? "gameDisplay hidden" : "gameDisplay"}>
        <h4 className="room">ID room: {room}</h4>
        <Table />
        <Dice />
        <Chat />
      </div>
    </div>
  );
}

export default App;
