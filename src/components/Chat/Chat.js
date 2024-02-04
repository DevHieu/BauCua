import React, { useState } from "react";

import Message from "./Message/Message";
import styles from "./Chat.module.scss";

export default function Chat() {
  return (
    <div className={styles.wrapper}>
      <div className={styles.PlayerChat}>
        <Message text="hi" player="hieu" />
        <Message text="hi" player="hieu" />
        <Message text="hi" player="hieu" />
        <Message text="hi" player="hieu" />
        <Message text="hi" player="hieu" />
        <Message text="hi" player="hieu" />
        <Message text="hi" player="hieu" />
        <Message text="hi" player="hieu" />
        <Message text="hi" player="hieu" />
      </div>
      <input type="text" className={styles.chat_box} />
    </div>
  );
}
