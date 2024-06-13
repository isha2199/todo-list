import React from "react";
import saveIcon from "../assets/saveIcon.svg";
import addIcon from "../assets/addIcon.svg";
import cx from "classnames";

const TodoInput = ({
  ctaText,
  inputValue,
  inputDescription,
  changeHandler,
  ctaHandler,
  openBottomSheet,
}) => {
  return (
    <div className="bottomSheet">
      {openBottomSheet && <div className="sheetHeader">Add todo items</div>}
      <input
        className="input"
        type="text"
        name="name"
        value={inputValue}
        onChange={changeHandler}
        placeholder="Task Name"
      />
      <input
        className="input"
        type="text"
        name="description"
        value={inputDescription}
        onChange={changeHandler}
        placeholder="Task Description"
      />
      {ctaText === "Save" ? (
        <img src={saveIcon} className="icons" onClick={ctaHandler} />
      ) : (
        <button
          className={cx("addCta", inputValue === "" ? "disabledCta" : "")}
          disabled={inputValue === ""}
          onClick={ctaHandler}
        >
          {openBottomSheet && (
            <img src={addIcon} className="icons" onClick={ctaHandler} />
          )}
          {ctaText}
        </button>
      )}
    </div>
  );
};

export default TodoInput;
