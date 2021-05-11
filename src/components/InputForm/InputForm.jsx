import React from "react";
import styles from "./InputForm.module.css";

const InputForm = ({ nameInput, numberInput, submitEntry }) => {
  return (
    <section className={styles.newEntrySection}>
      <form className={styles.inputForm} onSubmit={submitEntry}>
        <label className="inputLabel">
          First / Last name :
          <input
            className="inputField"
            type="text"
            onChange={nameInput}
            required
          />
        </label>
        <label className="inputLabel">
          Phone number :
          <input
            className="inputField"
            type="tel"
            onChange={numberInput}
            required
          />
        </label>
        <button className={styles.newEntryButton} type="submit">
          Add entry
        </button>
      </form>
    </section>
  );
};

export default InputForm;
