import { render, screen } from "@testing-library/react";
import user from "@testing-library/user-event";
import UserForm from "./UserForm";

test("두개의 인풋과 버튼이 잘 표시되는지 확인", () => {
  // 1. 구성요소 렌더링
  render(<UserForm />);

  // 2. 그 안의 컴포넌트 및 요소를 확인한다.
  const inputs = screen.getAllByRole("textbox");
  const button = screen.getByRole("button");

  // 3. 구성요소가 의도대로 동작하는지 확인한다.
  //    콜백 (요소 보여주기, 업데이트 다양한 기능 등등)
  expect(inputs).toHaveLength(2);
  expect(button).toBeInTheDocument();
});

test("유저를 추가할 때 호출이 잘 되는지 확인", async () => {
  const mock = jest.fn();

  render(<UserForm onUserAdd={mock} />);
  // 해당 방법이 항상 최선의 방법은 아닐 수 있음을 언제나 기억하기.
  // 두 input을 찾는다.

  const nameInput = screen.getByRole("textbox", {
    name: /name/i,
  });

  const emailInput = screen.getByRole("textbox", {
    name: /email/i,
  });

  // 이름 입력하는 시뮬레이션
  await user.click(nameInput);
  await user.keyboard("jane");

  // 이메일 입력하는 시뮬레이션
  await user.click(emailInput);
  await user.keyboard("jane@jane.com");

  // 버튼을 찾는다.
  const button = screen.getByRole("button");

  // 버튼을 누르는 시뮬레이션
  user.click(button);

  // Assertion to make sure 'onUserAdd' gets called with email/name
  expect(mock).toHaveBeenCalled();
  expect(mock).toHaveBeenCalledWith({ name: "jane", email: "jane@jane.com" });
});

test("제출되었을 때 두개의 인풋값을 모두 비운다.", () => {
  render(<UserForm onUserAdd={() => {}} />);

  const nameInput = screen.getByRole("textbox", { name: /name/i });
  const emailInput = screen.getByRole("textbox", { name: /email/i });
  const button = screen.getByRole("button");

  user.click(nameInput);
  user.keyboard("jane");
  user.click(emailInput);
  user.keyboard("jane@jane.com");

  user.click(button);

  // expect: 기대되는 부분, toHaveValue: matchers
  expect(nameInput).toHaveValue("");
  expect(emailInput).toHaveValue("");
});
