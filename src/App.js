import React, { useEffect, useState } from "react";
import io from "socket.io-client";

import Table from "./components/table/table";
import Dice from "./components/dice/Dice";
import Chat from "./components/Chat/Chat";
import Login from "./components/Login/Login";
import "./App.scss";
import sound from "./resource/audio/BackgroundMusic.mp3";

const socket = io.connect("http://localhost:8000");

function App() {
  const audio = new Audio(sound);

  const [room, setRoom] = useState("");
  const [name, setName] = useState("");
  const [isLogin, setIsLogin] = useState(false);
  const [choose, setChoose] = useState([]);
  const [dices, setDices] = useState([]);
  const [money, setMoney] = useState(1000);
  const [success, setSuccess] = useState(false);
  const [isShuffle, setIsShuffle] = useState(false);
  let currentMoney = money;

  useEffect(() => {
    if (isLogin && room !== "") {
      socket.emit("join_room", room);
      audio.play();
      audio.loop = true;
      audio.volume = 1;
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [isLogin]);

  //create an alt money object
  useEffect(() => {
    // eslint-disable-next-line react-hooks/exhaustive-deps
    currentMoney = money;
  }, [money]);

  // plus money
  useEffect(() => {
    dices.forEach(prizes);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [dices]);

  useEffect(() => {
    if (success) {
      setTimeout(() => {
        setSuccess(false);
      }, 2000);
    }
  }, [success]);

  const prizes = (value) => {
    console.log(choose);
    if (choose.includes(value) === true) {
      currentMoney += 100;
      setMoney(currentMoney);
    }
  };

  const handleVolume = (value) => {
    audio.volume = value;
  };

  const handleOutGame = () => {
    socket.emit("leave_room", room);
    setIsLogin(false);
    audio.pause();
    audio.currentTime = 0;
  };

  return (
    <div className="App">
      <div className={isLogin ? "join_room hidden" : "join_room"}>
        <Login RoomId={setRoom} UserName={setName} isLogin={setIsLogin} />
      </div>
      <div className={!isLogin ? "gameDisplay hidden" : "gameDisplay"}>
        <h4 className="room">ID room: {room}</h4>
        <h4 className="money">money: {money}</h4>
        <h4 className="volume">
          audio:
          <input
            type="range"
            min="0"
            max="1"
            step="0.01"
            onChange={(value) => {
              handleVolume(value.target.value);
            }}
          ></input>
        </h4>
        <h4 onClick={handleOutGame} className="back">
          Out room
        </h4>
        <Table
          socket={socket}
          roomId={room}
          userName={name}
          choose={setChoose}
          money={money}
          setMoney={setMoney}
          clear={success}
          shuffle={isShuffle}
        />
        <Dice
          socket={socket}
          roomId={room}
          randomDices={setDices}
          shuffle={setIsShuffle}
          ShuffleSuccess={setSuccess}
        />
        <Chat socket={socket} roomId={room} userName={name} />
      </div>
    </div>
  );
}

export default App;
