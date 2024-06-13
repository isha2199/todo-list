import React, { useState } from "react";
import "./style.css";
import TodoInput from "./TodoInput";
import editIcon from "../assets/editIcon.svg";
import deleteIcon from "../assets/deleteIcon.svg";

const TodoList = ({ todos, onToggleCheck, onDelete, setTodos }) => {
  const [editId, setEditId] = useState();
  const [editValue, setEditValue] = useState({ name: "", description: "" });

  const editHandler = (id) => {
    const todoToEdit = todos.find((todo) => todo.id === id);
    if (todoToEdit) {
      setEditId(id);
      setEditValue({
        name: todoToEdit.name,
        description: todoToEdit.description,
      });
    }
  };

  const saveEditHandler = () => {
    setTodos(
      todos.map((todo) =>
        todo.id === editId ? { ...todo, ...editValue } : todo
      )
    );
    setEditId(null);
    setEditValue({ name: "", description: "" });
  };

  return (
    <div className="container">
      <div>
        {todos.map((todo, index) => (
          <div key={index}>
            <div className="todoList">
              <div className="list">
                <input
                  type="checkbox"
                  checked={todo.checked}
                  onChange={() => onToggleCheck(todo.id)}
                />
                {editId === todo.id ? (
                  <TodoInput
                    ctaText="Save"
                    inputValue={editValue.name}
                    inputDescription={editValue.description}
                    changeHandler={(e) =>
                      setEditValue({
                        ...editValue,
                        [e.target.name]: e.target.value,
                      })
                    }
                    ctaHandler={saveEditHandler}
                  />
                ) : (
                  <div style={{ marginLeft: "10px" }}>
                    <span
                      style={{
                        fontWeight: "bold",
                        textDecoration: todo.checked ? "line-through" : "none",
                      }}
                    >
                      {todo.name}
                    </span>
                    <p
                      style={{
                        textDecoration: todo.checked ? "line-through" : "none",
                        margin: "5px 0",
                      }}
                    >
                      {todo.description}
                    </p>
                  </div>
                )}
              </div>

              <div>
                <img
                  src={editIcon}
                  className="icons"
                  onClick={() => editHandler(todo.id)}
                />
                <img
                  src={deleteIcon}
                  className="icons"
                  onClick={() => onDelete(todo.id)}
                />
              </div>
            </div>
            <div
              className={index !== todos.length - 1 ? "separator" : ""}
            ></div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default TodoList;
