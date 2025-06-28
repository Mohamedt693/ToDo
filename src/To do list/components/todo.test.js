import { render, screen, fireEvent } from "@testing-library/react";
import Todo from "./Todo";
import { Provider } from "react-redux";
import {store} from "../../Redux-state/store"




const fakeTodo = {
    title: "اذكار الصباح والمساء",
    details: "تفاصيل المهمة",
    isComplated: false
};


const mockHandlers = {
  handleDeleteClick: jest.fn(),
  handleUpdateClick: jest.fn(),
  handlecheckClick: jest.fn()
};

describe("Todo (using Integration Test)", () => {
    
test("renders todo title correctly", () => {
    render(
        <Provider store={store}>
            <Todo todo={fakeTodo} {...mockHandlers}/>
        </Provider>
    )

    const title = screen.getByText(/اذكار الصباح والمساء/i) 

    expect(title).toBeInTheDocument();
});

test("calls handleDeleteClick when delete button is clicked", () => {

    render(
        <Provider store={store}>
            <Todo todo={fakeTodo} {...mockHandlers}/>
        </Provider>
    )

    const deleteButton = screen.getByLabelText("delete");
    fireEvent.click(deleteButton);

  expect(mockHandlers.handleDeleteClick).toHaveBeenCalledWith(fakeTodo);
});

test("calls handleUpdateClick when update button is clicked", () => {
    render(
        <Provider store={store}>
            <Todo todo={fakeTodo} {...mockHandlers}/>
        </Provider>
    )

    const editBtn = screen.getByLabelText("edit");
    fireEvent.click(editBtn);

  expect(mockHandlers.handleUpdateClick).toHaveBeenCalledWith(fakeTodo);
})


test("calls dispatch and handleCheckClick when check button is clicked (not completed)", () => {
    const mockSnack = jest.fn()
    render(
        <Provider store={store}>
            <Todo
                todo={fakeTodo}
                handleDeleteClick={() => {}}
                handleUpdateClick={() => {}}
                handleSnackClick={mockSnack}
            />
        </Provider>
    )

    const checkButton = screen.getByLabelText("check");
    fireEvent.click(checkButton);

    expect(mockSnack).toHaveBeenCalledWith("تم الانهاء بنجاح");
});

test("calls dispatch and handleSnackClick with undo message when todo is already completed", () => {
    const mockSnack = jest.fn();

    const completedTodo = {
        title: fakeTodo.title,
        details: fakeTodo.details,
        isComplated: true,
    };


    render(
        <Provider store={store}>
            <Todo
                todo={completedTodo}
                handleDeleteClick={() => {}}
                handleUpdateClick={() => {}}
                handleSnackClick={mockSnack}
            />
        </Provider>
    )

    const checkButton = screen.getByLabelText("check");
    fireEvent.click(checkButton);

    expect(mockSnack).toHaveBeenCalledWith("تراجع عن الانهاء");
});

})

