import { render, screen, within } from "@testing-library/react";
import UserList from "./UserList";

test("사용자 당 하나의 행을 렌더링한다.", () => {
  const users = [
    { name: "jane", email: "jane@jane.com" },
    { name: "sam", email: "sam@sam.com" },
  ];

  render(<UserList users={users} />);

  const rows = within(screen.getByTestId("users")).getAllByRole("row");
  expect(rows).toHaveLength(2);
});

test("각 유저의 이메일, 이름이 렌더링 된다.", () => {});
