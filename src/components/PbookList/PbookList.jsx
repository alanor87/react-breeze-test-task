import React from "react";
import styles from "./PbookList.module.css";

const PbookList = ({ entries, onEdit, onDelete }) => {
  return (
    <section>
      <ul className={styles.pbookList}>
        <li className={`${styles.entry} ${styles.pbookHeader}`}>
          <span>Name</span>
          <span>Phone number</span>
          <span>Actions</span>
        </li>
        {entries.map((entry) => (
          <li className={styles.entry} key={entry.id}>
            <span>{entry.name}</span>
            <span>{entry.number}</span>
            <div className={styles.controlBtnContainer}>
              <button
                className={styles.entryControlBtn}
                type="button"
                data-id={entry.id}
                onClick={onEdit}
              >
                Edit
              </button>
              <button
                className={styles.entryControlBtn}
                type="button"
                data-id={entry.id}
                onClick={onDelete}
              >
                Delete
              </button>
            </div>
          </li>
        ))}
      </ul>
    </section>
  );
};

export default PbookList;
