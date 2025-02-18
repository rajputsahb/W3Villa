import Task from '../models/Task.js';

export const getTasks = async (req, res) => {
  const tasks = await Task.find({ user: req.user.id });
  res.json(tasks);
};

export const createTask = async (req, res) => {
  const { title, description } = req.body;
  const task = new Task({ user: req.user.id, title, description });
  await task.save();
  res.status(201).json(task);
};

export const updateTask = async (req, res) => {
  const task = await Task.findById(req.params.id);
  if (task.user.toString() !== req.user.id) return res.status(401).json({ message: 'Unauthorized' });

  task.title = req.body.title || task.title;
  task.description = req.body.description || task.description;
  task.status = req.body.status || task.status;
  
  await task.save();
  res.json(task);
};

export const deleteTask = async (req, res) => {
  try {
    const task = await Task.findById(req.params.id);

    if (!task) {
      return res.status(404).json({ message: 'Task not found' });
    }

    if (task.user.toString() !== req.user.id) {
      return res.status(401).json({ message: 'Unauthorized' });
    }

    await Task.findByIdAndDelete(req.params.id);

    res.json({ message: 'Task removed successfully' });
  } catch (error) {
    res.status(500).json({ message: 'Server Error', error: error.message });
  }
};
