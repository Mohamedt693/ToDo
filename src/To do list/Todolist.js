import "../index.css";
// Material ui
import Button from "@mui/material/Button";
import Stack from "@mui/material/Stack";
import TextField from "@mui/material/TextField";
import Box from "@mui/material/Box";
import ToggleButton from "@mui/material/ToggleButton";
import ToggleButtonGroup from "@mui/material/ToggleButtonGroup";
import { Divider } from "@mui/material";
// React Hooks
import { useState, useEffect, useMemo } from "react";
// components
import Todo from "./components/Todo";
import Mysnackbar from "./components/Mysnackbar";
import Updatedialog from "./components/dialogs/Updatedialog";
import Deletedialog from "./components/dialogs/Deletedialog";
// Redux Toolkit
import { useSelector, useDispatch } from "react-redux";
import { add, deleteTodo, get, update } from "../Features/todo/todoSlice"

export default function TodoList() {
    const todos = useSelector((state) => state.todo.todos);
    const dispatch = useDispatch();

    const [inputValue, setInputValue] = useState("");

    const [displayedTodo, setdisplayedTodo] = useState("all");

    const [dailogTodo, setDialogTodo] = useState({ title: "", details: ""});
    const [updateValue, setUpdateValue] = useState({ title: "", details: "" });

    const [deleteDialog, setDeleteDialog] = useState(false);
    const [updateDialog, setUpdateDialog] = useState(false);
    const [open, setOpen] = useState(false);

    const [message, setMessage] = useState("");

    const handleSnackClick = (message) => {
        setMessage(message);
        setOpen(true);
    };

    const handleSnackClose = () => {
        setOpen(false);
    };


    useEffect(() => {
        if (process.env.NODE_ENV !== "test") {
            dispatch(get());
        }
    }, [dispatch]);

    const complatedTodos = useMemo(() => {
        return (todos || []).filter((T) => {
            return T.isComplated;
        });
    }, [todos]);

    const notComplatedTodos = useMemo(() => {
        return (todos || []).filter((T) => {
            return !T.isComplated;
        });
    }, [todos]);

    let RenderedTodos;

    if (displayedTodo === "complated") {
        RenderedTodos = complatedTodos;
    } else if (displayedTodo === "not-complated") {
        RenderedTodos = notComplatedTodos;
    } else if (displayedTodo === "all") {
        RenderedTodos = todos || [];
    }

    const todoJsx = RenderedTodos.map((t) => {
        return (
            <Todo
            key={t.id}
            todo={t}
            handleDeleteClick={handleDeleteClick}
            handleUpdateClick={handleUpdateClick}
            handleSnackClick={handleSnackClick}
            />
        );
    });

    function handleAddClick() {
        if (!inputValue.trim()) {
            handleSnackClick("عليك اضافة مهمة اولا");
            return;
        }
        
        dispatch(add({ title: inputValue }));
        handleSnackClick("تمت الاضافة بنجاح");
        setInputValue("");

        setTimeout(() => {
        window.scrollTo({ top: document.body.scrollHeight, behavior: "smooth" });
        }, 100);
    }

    function handleUpdateClick(todo) {
        setUpdateValue({ title: todo.title, details: todo.details || "" });
        setDialogTodo(todo);
        setUpdateDialog(true);
    }

    function handleUpdateClose() {
        setUpdateDialog(false);
    }

    function handleUpdateConfirm() {
        dispatch(update({ dailogTodo, updateValue }));
        handleSnackClick(" تم التعديل بنجاح");
        handleUpdateClose();
        setDialogTodo({ title: "", details: "" });
    }

    function handleDeleteClick(todo) {
        setDialogTodo(todo);
        setDeleteDialog(true);
    }

    function handleDeleteClose() {
        setDeleteDialog(false);
    }

    function handleDeleteConfirm() {
        dispatch(deleteTodo({ dailogTodo }));
        handleSnackClick("تم الحذف بنجاح");
        handleDeleteClose();
    }

    return (
    <>
        {/* Snackbar */}
        <Mysnackbar
        open={open}
        handleSnackClick={handleSnackClick}
        handleSnackClose={handleSnackClose}
        Message={message}
        />
        {/* updateDialog */}
        <Updatedialog
        update={updateDialog}
        handleUpdateClose={handleUpdateClose}
        handleUpdateConfirm={handleUpdateConfirm}
        updateValue={updateValue}
        setUpdateValue={setUpdateValue}
        />
        {/* deleteDialog */}
        <Deletedialog
        Delete={deleteDialog}
        handleDeleteClose={handleDeleteClose}
        handleDeleteConfirm={handleDeleteConfirm}
        />

        <div className="bg-white w-[750px] rounded-md p-4 shadow-md h-[96vh] overflow-y-auto">
            <header className="flex items-center justify-between">
                <h2 className="text-2xl font-bold text-gray-800 text-center">ToDo</h2>
                <ToggleButtonGroup
                color="primary"
                value={displayedTodo}
                exclusive
                onChange={(e) => {setdisplayedTodo(e.target.value);}}
                aria-label="Platform"
                >
                    <ToggleButton value="not-complated">غير المنجز</ToggleButton>
                    <ToggleButton value="complated">المنجز</ToggleButton>
                    <ToggleButton value="all">الكل</ToggleButton>
                </ToggleButtonGroup>
            </header>
            <Divider style={{ margin: "15px 0", backgroundColor: "#ccc" }} />
            <div className="py-5 px-1">
                {todoJsx}
            </div>
            <Divider style={{ margin: "15px 0", backgroundColor: "#ccc" }} />
            <footer className="mx-auto py-3">
                <Stack direction="row" className="w-full  flex flex-row gap-3">
                    <Button size="medium" variant="contained" onClick={handleAddClick}>اضافة</Button>
                    <Box component="form" onSubmit={(e) => {e.preventDefault(); handleAddClick();}}
                    noValidate
                    autoComplete="off"
                    className="flex-1"
                    >
                        <TextField fullWidth value={inputValue} onChange={(e) => setInputValue(e.target.value)}
                        id="outlined-basic"
                        variant="outlined"
                        />
                    </Box>
                </Stack>
            </footer>
        </div>
    </>
    );
}
