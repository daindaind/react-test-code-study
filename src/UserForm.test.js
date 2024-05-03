import { render, screen } from "@testing-library/react";
import user from "@testing-library/user-event";
import UserForm from "./UserForm";

test("입력창 두개와 버튼이 보인다.", () => {
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
