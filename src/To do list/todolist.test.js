import { render, screen, fireEvent } from "@testing-library/react";
import TodoList from "./Todolist";
import { useDispatch, useSelector } from "react-redux";
jest.mock("react-redux");


describe("TodoList (using Mocks)", () => {
  let mockDispatch;

  beforeEach(() => {
    mockDispatch = jest.fn();
    useDispatch.mockReturnValue(mockDispatch);
  });

  test("dispatches update action when confirming update", () => {

  const fakeTodo = {
    id: "1",
    title: "مهمة قديمة",
    details: "تفاصيل قديمة",
    isComplated: false,
  };

  useSelector.mockReturnValue([fakeTodo]);

  render(<TodoList />);

  // افتح الـ dialog
  const editButton = screen.getByRole("button", { name: /edit/i });
  fireEvent.click(editButton);

  // غيّر الـ input
  const input = screen.getByDisplayValue("مهمة قديمة");
  fireEvent.change(input, { target: { value: "مهمة معدلة" } });

  // اضغط confirm
  const confirmButton = screen.getByRole("button", { name: /^تعديل$/i });
  fireEvent.click(confirmButton);


  expect(mockDispatch).toHaveBeenCalledWith({
    type: expect.stringContaining("/update"),
    payload: {
      dailogTodo: expect.objectContaining({
        id: "1",
        title: "مهمة قديمة",
        details: "تفاصيل قديمة",
      }),
      updateValue: expect.objectContaining({
        title: "مهمة معدلة",
        details: "تفاصيل قديمة",
      }),
    },
  });
  
});

test("filters todos correctly based on selected toggle button", () => {

  const todos = [
    { id: "1", title: "مهمة 1", details: "تفاصيل", isComplated: false },
    { id: "2", title: "مهمة 2", details: "تفاصيل", isComplated: true },
    { id: "3", title: "مهمة 3", details: "تفاصيل", isComplated: false },
  ];

  useSelector.mockReturnValue(todos);

  render(<TodoList />);


    // في البداية الكل ظاهر
    expect(screen.getByTestId("todo-1")).toBeInTheDocument();
    expect(screen.getByTestId("todo-2")).toBeInTheDocument();
    expect(screen.getByTestId("todo-3")).toBeInTheDocument();

    // المنجز
    fireEvent.click(screen.getByRole("button", { name: "المنجز" }));
    expect(screen.queryByTestId("todo-1")).not.toBeInTheDocument();
    expect(screen.getByTestId("todo-2")).toBeInTheDocument();
    expect(screen.queryByTestId("todo-3")).not.toBeInTheDocument();

    // غير المنجز
    fireEvent.click(screen.getByRole("button", { name: "غير المنجز" }));
    expect(screen.getByTestId("todo-1")).toBeInTheDocument();
    expect(screen.queryByTestId("todo-2")).not.toBeInTheDocument();
    expect(screen.getByTestId("todo-3")).toBeInTheDocument();

    // الكل مرة تانية
    fireEvent.click(screen.getByRole("button", { name: "الكل" }));
    expect(screen.getByTestId("todo-1")).toBeInTheDocument();
    expect(screen.getByTestId("todo-2")).toBeInTheDocument();
    expect(screen.getByTestId("todo-3")).toBeInTheDocument();
  });

test("dispatches add action when clicking 'اضافة'", () => {
  // في البداية ما فيش مهام
  useSelector.mockReturnValue([]);

  render(<TodoList />);

  const input = screen.getByRole("textbox");
  const addButton = screen.getByRole("button", { name: "اضافة" });

  fireEvent.change(input, { target: { value: "اذكار الصباح" } });
  fireEvent.click(addButton);

  expect(mockDispatch).toHaveBeenCalledWith({
    type: expect.stringContaining("/add"),
    payload: { title: "اذكار الصباح" },
  });
});

test("renders new todo from selector", () => {

  useSelector.mockReturnValue([
    {
      id: "1",
      title: "اذكار الصباح",
      details: "",
      isComplated: false,
    },
  ]);

  render(<TodoList />);
  
  expect(screen.getByText("اذكار الصباح")).toBeInTheDocument();
});

  afterEach(() => {
    jest.clearAllMocks();
  });
})


