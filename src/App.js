/* eslint-disable react-hooks/exhaustive-deps */
import React, { useEffect, useState } from "react";
import io from "socket.io-client";

import Table from "./components/table/table";
import Dice from "./components/dice/Dice";
import Chat from "./components/Chat/Chat";
import Login from "./components/Login/Login";
import "./App.scss";
import sound from "./resource/audio/BackgroundMusic.mp3";
import { IoMdArrowRoundBack } from "react-icons/io";
import { CiMenuFries } from "react-icons/ci";

const socket = io.connect(process.env.REACT_APP_URL);

function App() {
  const audio = new Audio(sound);

  const [room, setRoom] = useState("");
  const [name, setName] = useState("");
  const [sidebar, setSidebar] = useState(false);
  const [isLogin, setIsLogin] = useState(false);
  const [choose, setChoose] = useState([]);
  const [dices, setDices] = useState([]);
  const [money, setMoney] = useState(500);
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
  }, [isLogin]);

  //create an alt money object
  useEffect(() => {
    currentMoney = money;
  }, [money]);

  // plus money
  useEffect(() => {
    dices.forEach(prizes);
  }, [dices]);

  useEffect(() => {
    if (success) {
      setTimeout(() => {
        setSuccess(false);
      }, 2000);
    }
  }, [success]);

  const prizes = (value) => {
    if (choose.includes(value) === true) {
      currentMoney += 200;
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
        <div className="info-compu">
          <h4 onClick={handleOutGame} className="back">
            <IoMdArrowRoundBack size={20} /> Out room
          </h4>
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
        </div>
        <div className="info-phone">
          <div
            className={sidebar ? "icon icon-extand" : "icon"}
            onClick={() => setSidebar(!sidebar)}
          >
            <CiMenuFries size={32} />
          </div>
          <div className={sidebar ? "crop invalid" : "crop"}></div>
          <div className={sidebar ? "sidebar extand" : "sidebar"}>
            <div className="container">
              <h4 onClick={handleOutGame} className="back">
                <IoMdArrowRoundBack size={20} /> Out room
              </h4>
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
            </div>
          </div>
        </div>
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
