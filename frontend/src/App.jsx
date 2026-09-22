import React, { useEffect, useState } from 'react';
import axios from 'axios';

// Fallback to relative endpoint or default host if env var isn't set properly
const BASE_URL = import.meta.env.VITE_API_URL || 'http://localhost:5000/api';
const API = `${BASE_URL.replace(/\/$/, '')}/tasks`;

function App() {
  const [tasks, setTasks] = useState([]);
  const [text, setText] = useState('');

  const fetchTasks = async () => {
    try {
      const res = await axios.get(API);
      // Safeguard: Ensure res.data is an array before setting state
      if (Array.isArray(res.data)) {
        setTasks(res.data);
      } else if (res.data && Array.isArray(res.data.tasks)) {
        // In case your backend wraps response in { tasks: [...] }
        setTasks(res.data.tasks);
      } else {
        console.error('Expected array response, got:', res.data);
        setTasks([]);
      }
    } catch (error) {
      console.error('Failed to fetch tasks:', error);
      setTasks([]);
    }
  };

  const addTask = async () => {
    if (!text.trim()) return;
    try {
      await axios.post(API, { text });
      setText('');
      fetchTasks();
    } catch (error) {
      console.error('Failed to add task:', error);
    }
  };

  const deleteTask = async (id) => {
    try {
      await axios.delete(`${API}/${id}`);
      fetchTasks();
    } catch (error) {
      console.error('Failed to delete task:', error);
    }
  };

  useEffect(() => {
    fetchTasks();
  }, []);

  return (
    <div style={{ padding: '20px' }}>
      <h1>To-Do List with Devops DB Test</h1>
      <input
        value={text}
        onChange={e => setText(e.target.value)}
        placeholder="New task"
      />
      <button onClick={addTask}>Add</button>
      <ul>
        {Array.isArray(tasks) && tasks.map(task => (
          <li key={task._id}>
            {task.text || task.title}
            <button onClick={() => deleteTask(task._id)} style={{ marginLeft: '8px' }}>❌</button>
          </li>
        ))}
      </ul>
    </div>
  );
}

export default App;