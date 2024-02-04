import React from "react";
import styles from "./ChooseButton.module.scss";

export default function ChooseButton({
  animal,
  name,
  sendToParent,
  chooseAnimal,
}) {
  const handleChoose = () => {
    sendToParent(animal);
  };

  return (
    <button
      onClick={handleChoose}
      className={
        animal === chooseAnimal
          ? `${styles.wrapper} ${styles.choose}`
          : styles.wrapper
      }
    >
      <h4
        className={
          animal === chooseAnimal
            ? `${styles.name} ${styles.hidden}`
            : styles.name
        }
      >
        {name}
      </h4>
    </button>
  );
}
