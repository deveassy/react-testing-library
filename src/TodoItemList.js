import React from "react";
import TodoItem from "./TodoItem";

const TodoItemList = ({ todos, onToggle, onRemove }) => {
  return (
    <ul data-testid="TodoItemList">
      {todos.map((todo) => (
        <TodoItem
          todo={todo}
          key={todo.id}
          onToggle={onToggle}
          onRemove={onRemove}
        />
      ))}
    </ul>
  );
};

export default TodoItemList;
