import React, { useState, useRef, useCallback } from "react";
import TodoForm from "../TodoForm";
import TodoItemList from "../TodoItemList";

const TodoApp = () => {
  const [todos, setTodos] = useState([
    {
      id: 1,
      text: "TDD 배우기",
      done: true,
    },
    {
      id: 2,
      text: "react-testing-library 사용하기",
      done: true,
    },
  ]);
  const nextId = useRef(3); // 새로 추가 할 항목에서 사용할 Id

  const onInsert = useCallback(
    (text) => {
      // 새 항목 추가 후
      setTodos(
        todos.concat({
          id: nextId.current,
          text,
          done: false,
        })
      );
      // nextId에 +1하기
      nextId.current += 1;
    },
    [todos]
  );

  const onToggle = useCallback(
    (id) => {
      setTodos(
        todos.map((todo) =>
          todo.id === id ? { ...todo, done: !todo.done } : todo
        )
      );
    },
    [todos]
  );

  const onRemove = useCallback(
    (id) => {
      setTodos(todos.filter((todo) => todo.id !== id));
    },
    [todos]
  );

  return (
    <>
      <TodoForm onInsert={onInsert} />
      <TodoItemList todos={todos} onToggle={onToggle} onRemove={onRemove} />
    </>
  );
};

export default TodoApp;
