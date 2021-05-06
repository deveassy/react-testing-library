import React from "react";
import { render, fireEvent } from "@testing-library/react";
import TodoForm from "..";

describe("<TodoForm />", () => {
  const setup = (props = {}) => {
    const utils = render(<TodoForm {...props} />);
    const { getByText, getByPlaceholderText } = utils;
    const input = getByPlaceholderText("할 일을 입력하세요");
    const button = getByText("등록");
    return {
      ...utils,
      input,
      button,
    };
  };

  it("has input and a button", () => {
    const { input, button } = setup();
    expect(input).toBeTruthy(); // 해당 값이 truthy한 값인지 확인하는 작업
    expect(button).toBeTruthy();
  });

  it("changes input", () => {
    const { input } = setup();
    fireEvent.change(input, {
      target: {
        value: "TDD배우기",
      },
    });
    expect(input).toHaveAttribute("value", "TDD배우기");
  });

  it("calls onInsert and clear input", () => {
    const onInsert = jest.fn();
    const { input, button } = setup({ onInsert }); // props가 필요할 땐 직접 파라미터로 전달할 수 있음
    // input을 수정하기
    fireEvent.change(input, {
      target: {
        value: "TDD 배우기",
      },
    });
    // button 클릭하기
    fireEvent.click(button);
    expect(onInsert).toBeCalledWith("TDD 배우기"); // onInsert 함수가 'TDD 배우기'라는 파라미터로 호출되었어야 함(called니까)
    expect(input).toHaveAttribute("value", ""); // input창이 비워져야 함
  });
});
