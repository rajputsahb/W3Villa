import { useEffect, useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";

const Dashboard = () => {
  const [tasks, setTasks] = useState([]);
  const [title, setTitle] = useState("");
  const navigate = useNavigate();

  useEffect(() => {
    const token = localStorage.getItem("token");
    if (!token) {
      navigate("/login");
      return;
    }
    axios.get("http://localhost:5000/api/tasks", { headers: { Authorization: `Bearer ${token}` } })
      .then((res) => setTasks(res.data))
      .catch(() => {
        localStorage.removeItem("token");
        navigate("/login");
      });
  }, []);

  const addTask = async () => {
    const token = localStorage.getItem("token");
    if (!token) return;
    const res = await axios.post("http://localhost:5000/api/tasks", { title }, { headers: { Authorization: `Bearer ${token}` } });
    setTasks([...tasks, res.data]);
    setTitle("");
  };

  const deleteTask = async (id) => {
    const token = localStorage.getItem("token");
    if (!token) return;
    await axios.delete(`http://localhost:5000/api/tasks/${id}`, { headers: { Authorization: `Bearer ${token}` } });
    setTasks(tasks.filter(task => task._id !== id));
  };

  const editTask = async (id, newTitle) => {
    const token = localStorage.getItem("token");
    if (!token) return;
    const res = await axios.put(`http://localhost:5000/api/tasks/${id}`, { title: newTitle }, { headers: { Authorization: `Bearer ${token}` } });
    setTasks(tasks.map(task => task._id === id ? res.data : task));
  };

  return (
    <div className="p-6">
      <h2 className="text-2xl font-bold mb-4">Dashboard</h2>
      <input type="text" placeholder="New Task" value={title} onChange={(e) => setTitle(e.target.value)} className="border p-2 rounded mb-2" />
      <button onClick={addTask} className="bg-blue-500 text-white p-2 rounded">Add Task</button>
      <ul>
        {tasks.map((task) => (
          <li key={task._id} className="p-2 border mt-2 flex justify-between">
            <span>{task.title}</span>
            <div>
              <button onClick={() => {
                const newTitle = prompt("Edit task title:", task.title);
                if (newTitle) editTask(task._id, newTitle);
              }} className="bg-yellow-500 text-white p-1 rounded mr-2">Edit</button>
              <button onClick={() => deleteTask(task._id)} className="bg-red-500 text-white p-1 rounded">Delete</button>
            </div>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default Dashboard;