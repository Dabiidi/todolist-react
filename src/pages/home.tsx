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
import { useEffect, useState } from "react";
import {
  addTask,
  deleteTask,
  fetchTasks,
} from "../services/auth/todolist.service";
import { useLocation } from "react-router-dom";
import StarIcon from "@mui/icons-material/Star";
import DeleteIcon from "@mui/icons-material/Delete";
import { formatDate } from "../utils/dateUtils";

function Home() {
  const location = useLocation();
  const { userId, name } = location.state || {};

  const [openTask, setOpenTask] = useState(false);
  const [task, setTask] = useState("");
  const [date, setDate] = useState<Date | null>(null);
  const [addDate, setAddDate] = useState(false);
  const [tasks, setTasks] = useState<{ task: string; task_id: string }[]>([]);

  const handleOpenModal = () => {
    setOpenTask(true);
  };

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
    } else {
      console.error("Failed to add task");
    }
    handleCloseModal();
  };

  console.log(tasks)
  const handleDeleteTask = async (taskId: string) => {
    console.log(taskId)
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

  useEffect(() => {
    if (userId) {
      fetchTasks(userId)
        .then((tasks) => setTasks(tasks))
        .catch((error) => console.error("Error fetching tasks:", error));
    }
  }, [userId]);

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
      }}
    >
      <Box
        sx={{
          display: "flex",
          flexDirection: "column",
          borderRadius: 8,
          overflow: "hidden",
          boxShadow: 3,
          width: "80%",
          maxWidth: "1000px",
          backgroundColor: "#ffffff",
        }}
      >
        <Typography
          variant="h3"
          sx={{
            backgroundColor: "#f2f2f2",
            padding: 2,
            borderBottom: "1px solid #ccc",
          }}
        >
          Welcome Back, {name}.
        </Typography>
        <Grid container spacing={2} sx={{ padding: 2 }}>
          <Grid item xs={3}>
            <Box
              sx={{ backgroundColor: "#f2f2f2", padding: 2, borderRadius: 2 }}
            >
              <Typography variant="h6">List</Typography>
              <List component="nav">
                <Divider />
                <ListItemButton>
                  <ListItemText primary="Personal" />
                </ListItemButton>
                <ListItemButton>
                  <ListItemText primary="Work" />
                </ListItemButton>
                <ListItemButton>
                  <ListItemText primary="Shopping" />
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
              }}
            >
              <Typography variant="h6">List of Tasks</Typography>
              <Divider />
              <List component="nav">
                {tasks.map((task, index) => (
                  <ListItemButton key={index}>
                    <ListItemIcon>
                      <IconButton>
                        <StarIcon />
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
                sx={{ alignSelf: "flex-end", marginTop: "auto" }}
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
