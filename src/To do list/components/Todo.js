import { useState } from "react";
// Material ui
import Card from "@mui/material/Card";
import CardContent from "@mui/material/CardContent";
import { Typography } from "@mui/material";
import IconButton from "@mui/material/IconButton";
import DeleteOutlineOutlinedIcon from "@mui/icons-material/DeleteOutlineOutlined";
import ModeEditOutlineOutlinedIcon from "@mui/icons-material/ModeEditOutlineOutlined";
import CheckOutlinedIcon from "@mui/icons-material/CheckOutlined";
import Grid from "@mui/material/Grid2";
// Css style
import "../../index.css";
// Redux state management
import { useDispatch } from "react-redux";
import {check} from "../../Redux-state/features/todo/todoSlice";



export default function Todo({
  todo,
  handleDeleteClick,
  handleUpdateClick,
  handleSnackClick,
}) {
  const [expanded, setExpanded] = useState(false);
  const dispatch = useDispatch();

  function handleCheckClick() {
    dispatch(check({ todo }));
    handleSnackClick(
      todo.isComplated ? "تراجع عن الانهاء" : "تم الانهاء بنجاح"
    );
  }

  const handleupdateClick = () => handleUpdateClick(todo);
  const handledeleteClick = () => handleDeleteClick(todo);

  return (
    <>
      <Card
        data-testid={`todo-${todo.id}`}
        className="shadow-sm hover:shadow-md transition-all rounded-lg p-2 mt-4"
        style={{
          background:
            "linear-gradient(-135deg, #e0f2ff, #c2e0ff, #90c8ff, #60a5fa, #3b82f6)",
        }}
      >
        <CardContent>
          <Grid className="w-full flex items-center justify-between flex-row-reverse gap-12">
            <Grid size={8}>
              <Typography
                data-testid={`todo-title-${todo.id}`}
                style={{ direction: "rtl" }}
                className={`text-lg text-start font-semibold transition-all ${
                  todo.isComplated
                    ? "line-through text-gray-400"
                    : "text-gray-800"
                }`}
                variant="h5"
              >
                {todo.title}
              </Typography>
              <Typography
                onClick={() => setExpanded(!expanded)}
                style={{ direction: "rtl" }}
                className={`text-sm text-gray-600 mt-1 cursor-pointer transition-all duration-300 ${
                  expanded
                    ? "whitespace-normal break-words"
                    : "truncate max-w-[250px]"
                }`}
                variant="h6"
              >
                {todo.details}
              </Typography>
            </Grid>
            <Grid size={4}>
              <div className="w-full flex items-center justify-between gap-[5px]">
                <IconButton
                  onClick={handledeleteClick}
                  aria-label="delete"
                  style={{
                    backgroundColor: "#FFF",
                    color: "#b23c17",
                    border: "solid 2px #b23c17",
                    fontSize: "18px",
                  }}
                >
                  <DeleteOutlineOutlinedIcon fontSize="10px" />
                </IconButton>
                <IconButton
                  onClick={handleupdateClick}
                  aria-label="edit"
                  style={{
                    backgroundColor: "#FFF",
                    color: "#1769aa",
                    border: "solid 2px #1769aa",
                    fontSize: "18px",
                  }}
                >
                  <ModeEditOutlineOutlinedIcon fontSize="10px" />
                </IconButton>
                <IconButton
                  onClick={handleCheckClick}
                  aria-label="check"
                  style={{
                    backgroundColor: todo.isComplated ? "#8bc34a" : "#fff",
                    color: todo.isComplated ? "#fff" : "#8bc34a",
                    border: "solid 2px #8bc34a",
                    fontSize: "18px",
                  }}
                >
                  <CheckOutlinedIcon fontSize="10px" />
                </IconButton>
              </div>
            </Grid>
          </Grid>
        </CardContent>
      </Card>
    </>
  );
}
