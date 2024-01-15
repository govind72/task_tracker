import React, { useState, useEffect } from "react";
import { DndProvider } from "react-dnd";
import { HTML5Backend } from "react-dnd-html5-backend";
import Task from "./components/task";
import TaskForm from "./components/taskform";
import {
  List,
  Typography,
  FormControl,
  InputLabel,
  Select,
  MenuItem,
  Grid,
} from "@mui/material";
import "./App.css";

const App = () => {
  const [tasks, setTasks] = useState([]);
  const [filter, setFilter] = useState("all");

  useEffect(() => {
    const storedTasks = JSON.parse(localStorage.getItem("tasks")) || [];
    setTasks(storedTasks);
  }, []);

  useEffect(() => {
    localStorage.setItem("tasks", JSON.stringify(tasks));
  }, [tasks]);

  const handleAddTask = (newTask) => {
    setTasks([...tasks, { ...newTask, id: Date.now() }]);
  };

  const handleDeleteTask = (taskId) => {
    setTasks(tasks.filter((task) => task.id !== taskId));
  };

  const handleToggleComplete = (taskId) => {
    setTasks(
      tasks.map((task) =>
        task.id === taskId ? { ...task, completed: !task.completed } : task
      )
    );
  };

  const handleMoveTask = (fromIndex, toIndex) => {
    const newTasks = [...tasks];
    const [removed] = newTasks.splice(fromIndex, 1);
    newTasks.splice(toIndex, 0, removed);
    setTasks(newTasks);
  };

  const filteredTasks = tasks.filter((task) => {
    if (filter === "all") return true;
    if (filter === "completed") return task.completed;
    if (filter === "incomplete") return !task.completed;
    return true;
  });

  return (
    <div display="flex" justifyContent="space-between">
      <div></div>
      <div>
        <Typography variant="h2" align="center" style={{ marginTop: "5px" }}>
          Task Tracker
        </Typography>
        <Grid container direction="row" alignItems="center">
          <Grid
            item
            container
            justifyContent="end"
            alignItems="center"
            direction="row"
          >
            <FormControl>
              <InputLabel>Filter:</InputLabel>
              <Select
                value={filter}
                onChange={(e) => setFilter(e.target.value)}
                label="Filter"
              >
                <MenuItem value="all">All</MenuItem>
                <MenuItem value="completed">Completed</MenuItem>
                <MenuItem value="incomplete">Incomplete</MenuItem>
              </Select>
            </FormControl>
          </Grid>
          <DndProvider backend={HTML5Backend}>
            <Grid container direction="column" alignItems="center">
              <TaskForm onAddTask={handleAddTask} />
              <Grid>
                <TaskList
                  tasks={filteredTasks}
                  onDelete={handleDeleteTask}
                  onToggleComplete={handleToggleComplete}
                  moveTask={handleMoveTask}
                />
              </Grid>
            </Grid>
          </DndProvider>
        </Grid>
      </div>
    </div>
  );
};

const TaskList = ({ tasks, onDelete, onToggleComplete, moveTask }) => (
  <List>
    {tasks.map((task, index) => (
      <Task
        key={task.id}
        task={task}
        index={index}
        onDelete={onDelete}
        onToggleComplete={onToggleComplete}
        moveTask={moveTask}
      />
    ))}
  </List>
);

export default App;
