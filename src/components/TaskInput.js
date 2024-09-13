// src/components/TaskInput.js
import React, { useState } from 'react';
import { useDispatch } from 'react-redux';
import { addTask } from '../redux/taskSlice';

const TaskInput = () => {
  const [task, setTask] = useState('');
  const [priority, setPriority] = useState('Medium');
  const [notification, setNotification] = useState('');
  const [repeat, setRepeat] = useState('None');
  const [dueDate, setDueDate] = useState('');
  const dispatch = useDispatch();

  const handleSubmit = (e) => {
    e.preventDefault();
    if (task.trim()) {
      dispatch(addTask({ text: task, priority, dueDate, repeat, notification }));
      setTask('');
      setPriority('Medium');
      setDueDate('');
      setRepeat('None');
      setNotification('');
    }
  };

  return (
    <form onSubmit={handleSubmit}>
      <input
        type="text"
        value={task}
        onChange={(e) => setTask(e.target.value)}
        placeholder="Add a new task"
      />
      <select value={priority} onChange={(e) => setPriority(e.target.value)}>
        <option value="High">High</option>
        <option value="Medium">Medium</option>
        <option value="Low">Low</option>
      </select>
      <input
        type="date"
        value={dueDate}
        onChange={(e) => setDueDate(e.target.value)}
      />
      <select value={repeat} onChange={(e) => setRepeat(e.target.value)}>
        <option value="None">None</option>
        <option value="Daily">Daily</option>
        <option value="Weekly">Weekly</option>
        <option value="Monthly">Monthly</option>
      </select>
      <input
        type="text"
        value={notification}
        onChange={(e) => setNotification(e.target.value)}
        placeholder="Enter notification message"
      />
      <button type="submit">Add Task</button>
    </form>
  );
};

export default TaskInput;
