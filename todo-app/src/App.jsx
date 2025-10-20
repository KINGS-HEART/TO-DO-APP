import { useState, useEffect } from "react";
import "./App.css";

function App() {
  const [tasks, setTasks] = useState(() => {
    // Load saved tasks from localStorage
    const saved = localStorage.getItem("tasks");
    return saved ? JSON.parse(saved) : [];
  });

  const [inputValue, setInputValue] = useState("");

  // Save to localStorage whenever tasks change
  useEffect(() => {
    localStorage.setItem("tasks", JSON.stringify(tasks));
  }, [tasks]);

  const addTask = () => {
    if (!inputValue.trim()) {
      alert("You must write something!");
      return;
    }
    setTasks([...tasks, { text: inputValue, completed: false }]);
    setInputValue("");
  };

  const toggleTask = (index) => {
    const updated = tasks.map((task, i) =>
      i === index ? { ...task, completed: !task.completed } : task
    );
    setTasks(updated);
  };

  const deleteTask = (index) => {
    const updated = tasks.filter((_, i) => i !== index);
    setTasks(updated);
  };

  return (
    <div className="container">
      <div className="todo-app">
        <h2>
          To-Do List <img src="/to-do-image.jpg" alt="To-Do Icon" />
        </h2>
        <div className="row">
          <input
            type="text"
            id="input-box"
            placeholder="Add your task"
            value={inputValue}
            onChange={(e) => setInputValue(e.target.value)}
          />
          <button onClick={addTask}>Add</button>
        </div>

        <ul id="list-container">
          {tasks.map((task, index) => (
            <li
              key={index}
              className={task.completed ? "checked" : ""}
              onClick={() => toggleTask(index)}
            >
              {task.text}
              <span onClick={() => deleteTask(index)}>&times;</span>
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
}

export default App;
