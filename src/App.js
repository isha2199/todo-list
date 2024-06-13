import React, { useState } from "react";
import "./App.css";
import { v4 as uuidv4 } from "uuid";
import TodoList from "./components/TodoList";
import TodoInput from "./components/TodoInput";
import addIcon from "./assets/addIcon.svg";
import { findDate } from "./utils";

const App = () => {
  const [todos, setTodos] = useState([]);
  const [currentTodo, setCurrentTodo] = useState({ name: "", description: "" });
  const [openBottomSheet, setOpenBottomSheet] = useState(false);

  const inputHandler = (e) => {
    const { name, value } = e.target;
    setCurrentTodo({
      ...currentTodo,
      [name]: value,
    });
  };

  const addTodoHandler = () => {
    if (openBottomSheet) {
      setOpenBottomSheet(false);
    }
    if (currentTodo.name?.length) {
      setTodos([
        ...todos,
        {
          id: uuidv4(),
          ...currentTodo,
          checked: false,
        },
      ]);
      setCurrentTodo({ name: "", description: "" });
    }
  };

  const deleteHandler = (id) => {
    setTodos(todos.filter((el) => el.id !== id));
  };

  const toggleCheckHandler = (id) => {
    setTodos(
      todos.map((todo) =>
        todo.id === id ? { ...todo, checked: !todo.checked } : todo
      )
    );
  };

  return (
    <div className="app">
      <div className="nav">
        <nav className="navbar">
          <div className="sidebar">
            <a href="#home">Home</a>
          </div>
        </nav>
      </div>

      <div className="todoContainer">
        <div className="wrapper" onClick={() => setOpenBottomSheet(false)}>
          <div className="heading">Today</div>
          <span className="date">{findDate()}</span>
          <div className="separator"></div>
          <div className="inputClass">
            <TodoInput
              ctaText="Add task"
              inputValue={currentTodo.name}
              inputDescription={currentTodo.description}
              changeHandler={inputHandler}
              ctaHandler={addTodoHandler}
            />
          </div>

          {todos.length ? (
            <TodoList
              todos={todos}
              onToggleCheck={toggleCheckHandler}
              onDelete={deleteHandler}
              setTodos={setTodos}
            />
          ) : null}
        </div>

        <div
          onClick={() => setOpenBottomSheet(false)}
          style={{ height: "100vh" }}
        ></div>

        {openBottomSheet ? (
          <div>
            <TodoInput
              ctaText="Add task"
              inputValue={currentTodo.name}
              inputDescription={currentTodo.description}
              changeHandler={inputHandler}
              ctaHandler={addTodoHandler}
              openBottomSheet={openBottomSheet}
            />
          </div>
        ) : (
          <div className="add" onClick={() => setOpenBottomSheet(true)}>
            <img className="icon" src={addIcon} />
          </div>
        )}
      </div>
    </div>
  );
};

export default App;
