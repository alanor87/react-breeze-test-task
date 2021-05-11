import React from "react";
import { createPortal } from "react-dom";
import styles from "./ModalEdit.module.css";

const modalRoot = document.querySelector("#modal-root");

const ModalEdit = ({
  numberInput,
  nameInput,
  onClose,
  onEditSubmit,
  currentName,
  currentNumber,
}) => {
  return createPortal(
    <div className={styles.backdrop} onMouseDown={onClose}>
      <form className={styles.modalEditForm} onSubmit={onEditSubmit}>
        <label className="inputLabel">
          Name
          <input
            className="inputField"
            type="text"
            onChange={nameInput}
            value={currentName}
            required
          />
        </label>
        <label className="inputLabel">
          Phone number. :
          <input
            className="inputField"
            type="text"
            onChange={numberInput}
            value={currentNumber}
            required
          />
        </label>
        <button className={styles.submitEditBtn} type="submit">Save changes</button>
      </form>
    </div>,
    modalRoot
  );
};

export default ModalEdit;
