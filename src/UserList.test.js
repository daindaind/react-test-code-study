import { render, screen, within } from "@testing-library/react";
import UserList from "./UserList";

// 테스트 코드를 실행하기 전에 렌더링을 진행하도록 함수로 분리한다.
function renderComponent() {
  const users = [
    { name: "jane", email: "jane@jane.com" },
    { name: "sam", email: "sam@sam.com" },
  ];

  render(<UserList users={users} />);

  return {
    users,
  };
}

test("사용자 당 하나의 행을 렌더링한다.", () => {
  renderComponent();
  //   screen.logTestingPlaygroundURL();

  //   const { container } = render(<UserList users={users} />);

  // eslint-disable-next-line
  //   const rows = container.querySelectorAll("tbody tr");

  // 해당 방식의 문제점 : 테스트를 위해 구성 요소를 변경하고 있음.
  const rows = within(screen.getByTestId("users")).getAllByRole("row");
  expect(rows).toHaveLength(2);
});

test("각 유저의 이메일, 이름이 렌더링 된다.", () => {
  const { users } = renderComponent();
  //   screen.logTestingPlaygroundURL();

  for (let user of users) {
    const name = screen.getByRole("cell", { name: user.name });
    const email = screen.getByRole("cell", { name: user.email });

    expect(name).toBeInTheDocument();
    expect(email).toBeInTheDocument();
  }
});
