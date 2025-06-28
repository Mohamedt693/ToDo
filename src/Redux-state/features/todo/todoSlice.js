import { createSlice } from "@reduxjs/toolkit";
import { v4 as uuidv4 } from "uuid";

const initialState = {
  todos: [],
};

const todoSlice = createSlice({
    name: "todo",
    initialState,
    reducers: {
        add: (state, action) => {
            if (action.payload.title) {
                const newTodo = {
                    id: uuidv4(),
                    title: action.payload.title,
                    details: "تفاصيل هذه المدونة ...",
                    isComplated: false,
                };
                state.todos.push(newTodo);
                localStorage.setItem("todos", JSON.stringify(state.todos));
                }
        },

        delete: (state, action) => {
            state.todos = state.todos.filter(
                (T) => T.id !== action.payload.dailogTodo.id
            );
            localStorage.setItem("todos", JSON.stringify(state.todos));
        },

        update: (state, action) => {
            state.todos = state.todos.map((T) => {
                if (T.id === action.payload.dailogTodo.id) {
                    return {
                        ...T,
                        title: action.payload.updateValue.title,
                        details: action.payload.updateValue.details,
                    };
                } else {
                    return T;
                }
            });
            localStorage.setItem("todos", JSON.stringify(state.todos));
        },

        get: (state) => {
            const storageTodos = JSON.parse(localStorage.getItem("todos")) ?? [];
            state.todos = storageTodos;
        },

        check: (state, action) => {
            state.todos = state.todos.map((T) => {
                if (T.id === action.payload.todo.id) {
                return { ...T, isComplated: !T.isComplated };
            }
            return T;
            });
            localStorage.setItem("todos", JSON.stringify(state.todos));
        },
    },
});

export const { add, delete: deleteTodo, update, get, check } = todoSlice.actions;

export default todoSlice.reducer;