import React, { useEffect, useState } from "react";
import {
  Box,
  Button,
  Checkbox,
  Dialog,
  DialogActions,
  DialogContent,
  DialogContentText,
  DialogTitle,
  Divider,
  FormControlLabel,
  Grid,
  IconButton,
  List,
  ListItemButton,
  ListItemIcon,
  ListItemText,
  TextField,
  Typography,
} from "@mui/material";
import { useLocation, useNavigate } from "react-router-dom";
import StarIcon from "@mui/icons-material/Star";
import DeleteIcon from "@mui/icons-material/Delete";
import {
  addTask,
  deleteTask,
  fetchTasks,
  updateTaskStarStatus,
} from "../services/auth/todolist.service";
import { formatDate } from "../utils/dateUtils";
import { Logout } from "@mui/icons-material";

function Home() {
  const location = useLocation();
  const { userId, name } = location.state || {};
  const navigate = useNavigate();
  const [openTask, setOpenTask] = useState(false);
  const [task, setTask] = useState("");
  const [date, setDate] = useState<Date | null>(null);
  const [addDate, setAddDate] = useState(false);
  const [starredTasks, setStarredTasks] = useState<string[]>([]);
  const [tasks, setTasks] = useState<{ task: string; task_id: string }[]>([]);
  const [selectedTab, setSelectedTab] = useState("All");

  useEffect(() => {
    if (userId) {
      fetchTasks(userId)
        .then((tasks) => setTasks(tasks))
        .catch((error) => console.error("Error fetching tasks:", error));
    }
  }, [userId]);

  const handleOpenModal = () => setOpenTask(true);
  const handleCloseModal = () => {
    setOpenTask(false);
    setAddDate(false);
    setTask("");
    setDate(null);
  };

  const handleSubmitTask = async () => {
    if (!task.trim()) {
      alert("Task field cannot be empty");
      return;
    }
    const success = await addTask(userId, task, date!);
    if (success) {
      alert("Task added successfully");
      fetchTasks(userId)
        .then((tasks) => setTasks(tasks))
        .catch((error) => console.error("Error fetching tasks:", error));
      handleCloseModal();
    } else {
      console.error("Failed to add task");
    }
  };

  const handleDeleteTask = async (taskId: string) => {
    const success = await deleteTask(userId, taskId);
    if (success) {
      console.log("Task deleted successfully");
      fetchTasks(userId)
        .then((tasks) => setTasks(tasks))
        .catch((error) => console.error("Error fetching tasks:", error));
    } else {
      console.error("Failed to delete task");
    }
  };

  const handleToggleStar = async (taskId: string) => {
    const isStarred = starredTasks.includes(taskId);
    const success = await updateTaskStarStatus(userId, taskId, !isStarred);
    if (success) {
      setStarredTasks(
        isStarred
          ? starredTasks.filter((id) => id !== taskId)
          : [...starredTasks, taskId]
      );
    }
  };

  const filteredTasks = tasks.filter((task) => {
    if (selectedTab === "Starred") {
      return starredTasks.includes(task.task_id);
    } else if (selectedTab === "Unstarred") {
      return !starredTasks.includes(task.task_id);
    }
    return true;
  });

  return (
    <Box
      sx={{
        display: "flex",
        height: "100vh",
        width: "100vw",
        backgroundColor: "#fbf3df",
        justifyContent: "center",
        alignItems: "center",
        padding: 2,
        overflow: "hidden",
      }}
    >
      <Box
        sx={{
          display: "flex",
          flexDirection: "column",
          borderRadius: 8,
          overflow: "hidden",
          boxShadow: 3,
          width: "100%",
          maxWidth: "1000px",
          backgroundColor: "#ffffff",
          height: "70%",
        }}
      >
        <Box
          sx={{
            display: "flex",
            alignItems: "center",
            justifyContent: "space-between",
            backgroundColor: "#f2f2f2",
            padding: 2,
          }}
        >
          <Typography
            variant="h3"
            sx={{
              backgroundColor: "#f2f2f2",
              padding: 2,
            }}
          >
            Welcome Back, {name}.
          </Typography>
          <Button variant="text" sx={{ minWidth: 0 }}>
            <Logout
              onClick={() => {
                navigate("/");
              }}
              sx={{ fontSize: 32 , color:"#000000"}}
            />
          </Button>
        </Box>

        <Grid container spacing={2} sx={{ padding: 2 }}>
          <Grid item xs={3}>
            <Box
              sx={{
                backgroundColor: "#f2f2f2",
                padding: 2,
                borderRadius: 2,
                maxHeight: "80vh",
              }}
            >
              <Typography variant="h6">List</Typography>
              <List component="nav">
                <Divider />
                <ListItemButton
                  onClick={() => setSelectedTab("All")}
                  selected={selectedTab === "All"}
                >
                  <ListItemText primary="All" />
                </ListItemButton>
                <ListItemButton
                  onClick={() => setSelectedTab("Unstarred")}
                  selected={selectedTab === "Unstarred"}
                >
                  <ListItemText primary="Unstarred" />
                </ListItemButton>
                <ListItemButton
                  onClick={() => setSelectedTab("Starred")}
                  selected={selectedTab === "Starred"}
                >
                  <ListItemText primary="Starred" />
                </ListItemButton>
              </List>
            </Box>
          </Grid>
          <Grid item xs={9}>
            <Box
              sx={{
                display: "flex",
                flexDirection: "column",
                backgroundColor: "#ffffff",
                padding: 2,
                borderRadius: 2,
                boxShadow: 1,
                height: "70%",
                minHeight: 350,
              }}
            >
              <Typography variant="h6">List of Tasks</Typography>
              <Divider />
              <List
                component="nav"
                sx={{
                  overflowY: "auto",

                  flexGrow: 1,
                  scrollbarWidth: "thin",
                  "&::-webkit-scrollbar": {
                    width: "6px",
                  },
                  "&::-webkit-scrollbar-thumb": {
                    backgroundColor: "#888",
                    borderRadius: "3px",
                  },
                }}
              >
                {filteredTasks.map((task, index) => (
                  <ListItemButton key={index}>
                    <ListItemIcon>
                      <IconButton
                        onClick={() => handleToggleStar(task.task_id)}
                      >
                        <StarIcon
                          color={
                            starredTasks.includes(task.task_id)
                              ? "primary"
                              : "inherit"
                          }
                        />
                      </IconButton>
                    </ListItemIcon>
                    <ListItemText primary={task.task} />
                    <IconButton onClick={() => handleDeleteTask(task.task_id)}>
                      <DeleteIcon />
                    </IconButton>
                  </ListItemButton>
                ))}
              </List>
              <Button
                variant="contained"
                sx={{ alignSelf: "flex-end", marginTop: 5 }}
                onClick={handleOpenModal}
              >
                <Typography>Add Task</Typography>
              </Button>
            </Box>
          </Grid>
        </Grid>
      </Box>
      <Dialog open={openTask} onClose={handleCloseModal}>
        <DialogTitle>Add Task</DialogTitle>
        <DialogContent>
          <DialogContentText>Enter the Detail of the Task</DialogContentText>
          <TextField
            margin="dense"
            label="Task"
            type="text"
            value={task}
            fullWidth
            onChange={(e) => setTask(e.target.value)}
          />
          <FormControlLabel
            control={
              <Checkbox
                checked={addDate}
                onChange={(e) => setAddDate(e.target.checked)}
              />
            }
            label="Add Date"
          />
          {addDate && (
            <TextField
              margin="dense"
              type="date"
              fullWidth
              variant="outlined"
              value={date ? formatDate(date) : ""}
              onChange={(e) =>
                setDate(e.target.value ? new Date(e.target.value) : null)
              }
            />
          )}
        </DialogContent>
        <DialogActions>
          <Button onClick={handleCloseModal}>Cancel</Button>
          <Button onClick={handleSubmitTask} disabled={!task.trim()}>
            Add task
          </Button>
        </DialogActions>
      </Dialog>
    </Box>
  );
}

export default Home;
