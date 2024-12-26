/* eslint-disable react-hooks/exhaustive-deps */
import React, { useEffect, useState } from "react";
import useDidMountEffect from "./hooks/useDidMountEffect";
import io from "socket.io-client";

import Table from "./components/table/table";
import Dice from "./components/dice/Dice";
import Chat from "./components/Chat/Chat";
import Login from "./components/Login/Login";
import ScoreBoard from "./components/ScoreBoard/ScoreBoard";
import "./App.scss";
import sound from "./resource/audio/BackgroundMusic.mp3";
import { IoMdArrowRoundBack } from "react-icons/io";
import { CiMenuFries } from "react-icons/ci";

const socket = io.connect(process.env.REACT_APP_URL, {
  "force new connection": true,
});

function App() {
  const bet = 100;
  // const [bet, setBet] = useState(100);
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
    if (isLogin) {
      audio.play();
      audio.loop = true;
      audio.volume = 1;
    }
  }, [isLogin]);

  //create an alt money object
  useDidMountEffect(() => {
    currentMoney = money;
  }, [money]);

  // plus money when user win
  let map = new Map();
  let MoneyWin = 0;
  const addMoney = () => {
    for (let i = 0; i < dices.length; i++) {
      if (choose.includes(dices[i]) === true) {
        if (map.has(dices[i])) {
          map.set(dices[i], map.get(dices[i]) + 1);
        } else {
          map.set(dices[i], 1);
        }
      }
    }

    // eslint-disable-next-line no-unused-vars
    for (let [key, value] of map) {
      MoneyWin += bet + value * bet;
    }
    currentMoney += MoneyWin;
    setMoney(currentMoney);
    MoneyWin = 0;
    map = new Map();
  };

  useDidMountEffect(async () => {
    // react please run me if 'dices' changes, but not on initial render
    await addMoney();
    await socket.emit("update_money", {
      room: room,
      money: currentMoney,
    });
  }, [dices]);

  useEffect(() => {
    if (success) {
      setTimeout(() => {
        setSuccess(false);
      }, 2000);
    }
  }, [success]);

  const handleVolume = (value) => {
    audio.volume = value;
  };

  const handleOutGame = () => {
    socket.emit("leave_room", room);
    setRoom("");
    setName("");
    setIsLogin(false);
    audio.pause();
    audio.currentTime = 0;
    setChoose([]);
    setMoney(500);
    setSidebar(false);
    setSuccess(false);
    setIsShuffle(false);
  };

  return (
    <div className="App">
      <div className={isLogin ? "join_room hidden" : "join_room"}>
        <Login
          socket={socket}
          RoomId={setRoom}
          UserName={setName}
          isLogin={setIsLogin}
        />
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
        <ScoreBoard socket={socket} roomId={room} shuffle={isShuffle} />
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
