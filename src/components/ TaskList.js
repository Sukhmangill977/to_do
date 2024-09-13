// src/components/TaskList.js
import React from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { deleteTask } from '../redux/taskSlice';
import { FaCalendarAlt, FaRedoAlt, FaBell } from 'react-icons/fa';

const TaskList = () => {
  const tasks = useSelector((state) => state.tasks.tasks);
  const dispatch = useDispatch();

  return (
    <ul>
      {tasks.map((task, index) => (
        <li key={index}>
          <div>{task.text}</div>
          {task.dueDate && <div><FaCalendarAlt /> Due Date: {task.dueDate}</div>}
          {task.repeat && <div><FaRedoAlt /> Repeat: {task.repeat}</div>}
          {task.notification && <div><FaBell /> Notification: {task.notification}</div>}
          <button onClick={() => dispatch(deleteTask(index))}>Delete</button>
        </li>
      ))}
    </ul>
  );
};

export default TaskList;
