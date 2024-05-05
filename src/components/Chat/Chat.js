import React, { useEffect, useState } from "react";
import ScrollableFeed from "react-scrollable-feed";

import Message from "./Message/Message";
import styles from "./Chat.module.scss";

export default function Chat({ socket, roomId, userName }) {
  const [currentMessage, setCurrentMessage] = useState("");
  const [messageData, setMessageData] = useState([]);

  const sendMessage = async () => {
    if (currentMessage !== "") {
      const messageData = {
        room: roomId,
        user: userName,
        message: currentMessage,
        time:
          new Date(Date.now()).getHours() +
          ":" +
          new Date(Date.now()).getMinutes(),
      };
      await socket.emit("send_message", messageData);
      setMessageData((list) => [...list, messageData]);
      setCurrentMessage("");
    }
  };

  useEffect(() => {
    socket.off("receive_message").on("receive_message", (data) => {
      setMessageData((list) => [...list, data]);
    });
  }, [socket]);

  return (
    <div className={styles.wrapper}>
      <ScrollableFeed className={styles.PlayerChat}>
        {messageData.map((data, index) => {
          return (
            <div
              key={index}
              className={data.user === userName ? styles.user : styles.rival}
            >
              <Message text={data.message} player={data.user} />
            </div>
          );
        })}
      </ScrollableFeed>
      <div className={styles.chat_footer}>
        <input
          type="text"
          className={styles.chat_box}
          onChange={(event) => {
            setCurrentMessage(event.target.value);
          }}
        />
        <button
          onClick={() => {
            sendMessage();
          }}
          className={styles.sendButton}
        >
          Send
        </button>
      </div>
    </div>
  );
}
