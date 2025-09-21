import React, { useState, useEffect } from 'react';
import { Plus } from 'lucide-react';
import TaskTable from './TaskTable';
import TaskModal from './TaskModal';
import * as taskApi from '../api/taskApi';
import type { Task } from './Types';

const TaskManager: React.FC = () => {
  const [tasks, setTasks] = useState<Task[]>([]);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [editingTask, setEditingTask] = useState<Task | undefined>();
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetchTasks();
  }, []);

  const fetchTasks = async () => {
    try {
      setLoading(true);
      const data = await taskApi.getTasks();
      setTasks(data);
    } catch (error) {
      console.error('Failed to fetch tasks:', error);
      alert('Failed to load tasks. Please try again.');
    } finally {
      setLoading(false);
    }
  };


  const handleSaveTask = async (taskData: Omit<Task, 'id'>) => {
    if (editingTask) {
      // Update task
      const updatedTask = await taskApi.updateTask(editingTask.id, taskData);
      setTasks(tasks.map(t => t.id === editingTask.id ? updatedTask : t));
    } else {
      // Add task
      const newTask = await taskApi.addTask(taskData);
      setTasks([...tasks, newTask]);
    }
  };

  // edit
  const handleEdit = (task: Task) => {
    setEditingTask(task);
    setIsModalOpen(true);
  };

  // delete
  const handleDelete = async (id: number) => {
    try {
      await taskApi.deleteTask(id);
      setTasks(tasks.filter(t => t.id !== id));
    } catch (error) {
      console.error('Failed to delete task:', error);
      alert('Failed to delete task. Please try again.');
    }
  };

  //status
  const handleStatusChange = async (id: number, status: Task['status']) => {
    try {
      const task = tasks.find(t => t.id === id);
      if (!task) return;

      const updatedTaskData: Omit<Task, 'id'> = {
        title: task.title,
        description: task.description,
        status,
        priority: task.priority,
        type: task.type,
      };

      const updatedTask = await taskApi.updateTask(id, updatedTaskData);
      setTasks(tasks.map(t => t.id === id ? updatedTask : t));
    } catch (error) {
      console.error('Failed to update task status:', error);
      alert('Failed to update task status. Please try again.');
    }
  };

  // modal closing
  const handleModalClose = () => {
    setIsModalOpen(false);
    setEditingTask(undefined);
  };

// add new task
  const handleAddNew = () => {
    setEditingTask(undefined);
    setIsModalOpen(true);
  };

  if (loading) {
    return (
      <div className="min-h-screen bg-gray-50 p-6 flex items-center justify-center">
        <div className="text-center">
          <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-gray-900 mx-auto"></div>
          <p className="mt-2 text-gray-600">Loading tasks...</p>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-50 p-6">
      <div className="max-w-6xl mx-auto scroll-auto">
        {/* Header */}
        <div className="flex justify-between items-center mb-6">
          <h1 className="text-2xl font-bold text-gray-900">Task Manager</h1>
          <button
            onClick={handleAddNew}
            className="flex items-center space-x-2 bg-black text-white px-4 py-2 rounded-md hover:bg-gray-800 transition-colors"
          >
            <Plus className="w-4 h-4" />
            <span>Add Task</span>
          </button>
        </div>

        {/* Table */}
        <TaskTable
          tasks={tasks}
          onEdit={handleEdit}
          onDelete={handleDelete}
          onStatusChange={handleStatusChange}
        />

        {/* Modal */}
        <TaskModal
          isOpen={isModalOpen}
          onClose={handleModalClose}
          onSave={handleSaveTask}
          task={editingTask}
        />
      </div>
    </div>
  );
};

export default TaskManager;