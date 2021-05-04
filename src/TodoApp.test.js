import React from "react";
import TodoApp from "./TodoApp";
import { render, fireEvent } from "@testing-library/react";

describe("<TodoApp />", () => {
  it("renders TodoForm and TodoItemList", () => {
    const { getByText, getByTestId } = render(<TodoApp />);
    getByText("등록"); // TodoForm 존재유무를 확인
    getByTestId("TodoItemList"); // TodoItemList 존재유무를 확인
  });

  it("renders two defaults todos", () => {
    const { getByText } = render(<TodoApp />);
    getByText("TDD 배우기");
    getByText("react-testing-library 사용하기");
  });

  it("create new todo", () => {
    const { getByPlaceholderText, getByText } = render(<TodoApp />);
    // 이벤트를 발생시켜서 새 항목을 추가하게 되면
    fireEvent.change(getByPlaceholderText("할 일을 입력하세요"), {
      target: {
        value: "새 항목 추가하기",
      },
    });
    fireEvent.click(getByText("등록"));
    // 해당 항목이 보여져야 함
    getByText("새 항목 추가하기");
  });

  it("toggles todo", () => {
    const { getByText } = render(<TodoApp />);
    // 'TDD 배우기' 항목에 클릭 이벤트를 발생시킨 후 text-decoration 속성이 적용되는지 확인
    const todoText = getByText("TDD 배우기");
    expect(todoText).toHaveStyle(`text-decoration: line-through`);
    fireEvent.click(todoText);
    expect(todoText).not.toHaveStyle(`text-decoration: line-through`);
    fireEvent.click(todoText);
    expect(todoText).toHaveStyle(`text-decoration: line-through`);
  });

  it("remove todo", () => {
    const { getByText } = render(<TodoApp />);
    const todoText = getByText("TDD 배우기");
    const removeButton = todoText.nextSibling;
    fireEvent.click(removeButton);
    expect(todoText).not.toBeInTheDocument(); // 페이지에서 사라진 것을 의미, expect(todoText).toBeNull()도 가능
  });
});
