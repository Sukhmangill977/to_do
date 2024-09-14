import React, { useState, useEffect, useRef } from 'react';
import { useNavigate } from 'react-router-dom';
import { fetchWeather } from '../services/weatherService';
import ProgressChart from '../components/ProgressChart';
import './ToDoPage.css';

const ToDoPage = () => {
  const [tasks, setTasks] = useState([]);
  const [task, setTask] = useState('');
  const [priority, setPriority] = useState('Medium');
  const [notification, setNotification] = useState('');
  const [repeat, setRepeat] = useState('None');
  const [dueDate, setDueDate] = useState('');
  const [weather, setWeather] = useState(null);
  const [location, setLocation] = useState('New York');
  const [isProfileVisible, setIsProfileVisible] = useState(false);
  const [newLocation, setNewLocation] = useState(location); // New state for location input
  const profileRef = useRef(null);
  const navigate = useNavigate();

  useEffect(() => {
    const storedTasks = JSON.parse(localStorage.getItem('tasks')) || [];
    setTasks(storedTasks);

    const getWeather = async () => {
      try {
        const data = await fetchWeather(location);
        setWeather(data);
      } catch (error) {
        console.error("Error fetching weather data:", error);
      }
    };

    getWeather();
  }, [location]);

  useEffect(() => {
    localStorage.setItem('tasks', JSON.stringify(tasks));
  }, [tasks]);

  const addTask = (e) => {
    e.preventDefault();
    if (task.trim()) {
      setTasks([...tasks, { text: task, priority, dueDate, repeat, notification, completed: false }]);
      setTask('');
      setPriority('Medium');
      setDueDate('');
      setRepeat('None');
      setNotification('');
    }
  };

  const handleInputChange = (e) => setTask(e.target.value);
  const handlePriorityChange = (e) => setPriority(e.target.value);
  const handleNotificationChange = (e) => setNotification(e.target.value);
  const handleRepeatChange = (e) => setRepeat(e.target.value);
  const handleDueDateChange = (e) => setDueDate(e.target.value);

  const handleLocationChange = (e) => setNewLocation(e.target.value); // Handle location input change
  const handleLocationSubmit = () => setLocation(newLocation); // Update location

  const handleLogout = () => {
    localStorage.removeItem('authToken');
    navigate('/');
  };

  const deleteTask = (index) => setTasks(tasks.filter((_, i) => i !== index));

  const toggleTaskCompletion = (index) => {
    const updatedTasks = tasks.map((task, i) =>
      i === index ? { ...task, completed: !task.completed } : task
    );
    setTasks(updatedTasks);
  };

  const toggleProfileSection = () => {
    setIsProfileVisible(!isProfileVisible);
    if (!isProfileVisible) {
      // Scroll to the To-Do list if profile is opened
      window.scrollTo({
        top: profileRef.current ? profileRef.current.offsetTop : 0,
        behavior: 'smooth',
      });
    }
  };

  const completedTasks = tasks.filter(task => task.completed).length;
  const totalTasks = tasks.length;

  return (
    <div className="container">
      {/* Toggle Profile Button */}
      <button
        className="toggle-profile-button"
        onClick={toggleProfileSection}
        aria-label={isProfileVisible ? "Close Profile" : "Open Profile"}
      >
        {isProfileVisible ? 'Close Profile' : 'Open Profile'}
      </button>

      {/* Profile Section */}
      <div className={`profile-section ${isProfileVisible ? 'visible' : 'hidden'}`} ref={profileRef}>
        <div className="profile-header">
          <h1>Profile</h1>
          <button onClick={handleLogout} className="logout-button">Logout</button>
        </div>
        <div className="profile-content">
          <img
            src="https://i.pinimg.com/564x/7b/ec/76/7bec76f6638f10d8565913728ec22208.jpg"
            alt="Profile"
            className="profile-img"
          />
          <div className="weather-container">
            <h3>Weather in {location}</h3>
            {weather ? (
              <div>
                <p>{weather.current.condition.text}</p>
                <img src={weather.current.condition.icon} alt={weather.current.condition.text} />
                <p>{weather.current.temp_c}°C</p>
              </div>
            ) : (
              <p>Loading weather data...</p>
            )}
            <div className="location-input">
              <input
                type="text"
                value={newLocation}
                onChange={handleLocationChange}
                placeholder="Enter new location"
              />
              <button onClick={handleLocationSubmit} className="btn btn-primary">Update Location</button>
            </div>
          </div>
          <div className="progress-container">
            <ProgressChart completed={completedTasks} total={totalTasks} />
          </div>
        </div>
      </div>

      {/* To-Do Section */}
      <div className={`todo-section ${isProfileVisible ? 'with-profile' : 'without-profile'}`}>
        <h2>To-Do List</h2>
        <form onSubmit={addTask}>
          <div className="form-group">
            <input
              type="text"
              value={task}
              onChange={handleInputChange}
              className="form-control"
              placeholder="Add a new task"
              required
            />
          </div>
          <div className="form-group">
            <label>Priority:</label>
            <select value={priority} onChange={handlePriorityChange} className="form-control">
              <option value="High">High</option>
              <option value="Medium">Medium</option>
              <option value="Low">Low</option>
            </select>
          </div>
          <div className="form-group">
            <label>Due Date:</label>
            <input
              type="date"
              value={dueDate}
              onChange={handleDueDateChange}
              className="form-control"
            />
          </div>
          <div className="form-group">
            <label>Notification:</label>
            <input
              type="text"
              value={notification}
              onChange={handleNotificationChange}
              className="form-control"
              placeholder="Notification details"
            />
          </div>
          <div className="form-group">
            <label>Repeat:</label>
            <select value={repeat} onChange={handleRepeatChange} className="form-control">
              <option value="None">None</option>
              <option value="Daily">Daily</option>
              <option value="Weekly">Weekly</option>
              <option value="Monthly">Monthly</option>
            </select>
          </div>
          <button type="submit" className="btn btn-primary">Add Task</button>
        </form>

        {/* Task List */}
        <ul>
          {tasks.map((task, index) => (
            <li key={index} className={`task-item ${task.completed ? 'completed' : ''}`}>
              <input
                type="checkbox"
                checked={task.completed}
                onChange={() => toggleTaskCompletion(index)}
                className="task-checkbox"
              />
              <span className="task-details">
                {task.text} - Priority: {task.priority} - Due: {task.dueDate} - Repeat: {task.repeat} - Notify: {task.notification}
              </span>
              <button
                className="btn btn-danger"
                onClick={() => deleteTask(index)}
              >
                Delete
              </button>
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
};

export default ToDoPage;
