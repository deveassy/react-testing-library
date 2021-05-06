import React from "react";
import TodoItemList from "..";
import { render, fireEvent } from "@testing-library/react";

describe("<TodoItemList />", () => {
  const sampleTodos = [
    {
      id: 1,
      text: "TDD 배우기",
      doen: true,
    },
    {
      id: 2,
      text: "react-testing-library 사용하기",
      done: true,
    },
  ];

  it("renders todos property", () => {
    const { getByText } = render(<TodoItemList todos={sampleTodos} />);
    getByText(sampleTodos[0].text);
    getByText(sampleTodos[1].text);
  });

  it("calls onToggle and onRemove", () => {
    const onToggle = jest.fn();
    const onRemove = jest.fn();
    const { getByText, getAllByText } = render(
      <TodoItemList
        todos={sampleTodos}
        onToggle={onToggle}
        onRemove={onRemove}
      />
    );

    fireEvent.click(getByText(sampleTodos[0].text));
    expect(onToggle).toBeCalledWith(sampleTodos[0].id); // toggle 기능 호출 확인

    fireEvent.click(getAllByText("삭제")[0]); // 첫번째 삭제 버튼을 클릭
    expect(onRemove).toBeCalledWith(sampleTodos[0].id);
  });
});
