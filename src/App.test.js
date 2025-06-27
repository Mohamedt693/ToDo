import { render, screen } from "@testing-library/react";
import App from "./App";
import { useDispatch, useSelector } from "react-redux";

jest.mock("react-redux");

test("يعرض قائمة المهام TodoList داخل التطبيق (باستخدام mocking)", () => {
  const mockDispatch = jest.fn();
  useDispatch.mockReturnValue(mockDispatch);

  useSelector.mockReturnValue([
    {
      id: "1",
      title: "اذكار الصباح",
      details: "",
      isComplated: false,
    },
  ]);

  render(<App />);

  expect(screen.getByRole("button", { name: "اضافة" })).toBeInTheDocument();
  expect(screen.getByText(/ToDo/i)).toBeInTheDocument();
  expect(screen.getByText("اذكار الصباح")).toBeInTheDocument();
});
