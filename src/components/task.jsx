import React from 'react';
import { useDrag, useDrop } from 'react-dnd';
import { ListItem, ListItemText, ListItemSecondaryAction, IconButton } from '@mui/material';
import DoneIcon from '@mui/icons-material/Done';
import UndoIcon from '@mui/icons-material/Undo';
import DeleteOutlineIcon from '@mui/icons-material/DeleteOutline';

const Task = ({ task, index, onToggleComplete, onDelete, moveTask }) => {
  const [, ref] = useDrag({
    type: 'TASK',
    item: { index },
  });

  const [, drop] = useDrop({
    accept: 'TASK',
    hover: (draggedItem) => {
      if (draggedItem.index !== index) {
        moveTask(draggedItem.index, index);
        draggedItem.index = index;
      }
    },
  });

  return (
    <ListItem ref={(node) => ref(drop(node))} className={task.completed ? 'completed' : ''}>
      <ListItemText
        primary={task.name}
        secondary={`Date Added: ${new Date(task.dateAdded).toLocaleDateString()}`}
      />
      <ListItemSecondaryAction>
        <IconButton onClick={() => onToggleComplete(task.id)}>
          {task.completed ? <UndoIcon /> : <DoneIcon />}
        </IconButton>
        <IconButton onClick={() => onDelete(task.id)}>
          <DeleteOutlineIcon />
        </IconButton>
      </ListItemSecondaryAction>
    </ListItem>
  );
};

export default Task;
