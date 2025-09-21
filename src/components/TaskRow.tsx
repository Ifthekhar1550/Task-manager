import React, { useState } from 'react';
import { MoreHorizontal, Circle, CheckCircle, Clock, XCircle } from 'lucide-react';
import type { Task } from './Types';

interface TaskRowProps {
  task: Task;
  onEdit: (task: Task) => void;
  onDelete: (id: number) => void;
  onStatusChange: (id: number, status: Task['status']) => void;
}

const TaskRow: React.FC<TaskRowProps> = ({ task, onEdit, onDelete, onStatusChange }) => {
  const [dropdownOpen, setDropdownOpen] = useState(false);

  const getStatusIcon = (status: Task['status']) => {
    switch (status) {
      case 'todo':
        return <Circle className="w-4 h-4 text-gray-400" />;
      case 'in-progress':
        return <Clock className="w-4 h-4 text-blue-500" />;
      case 'completed':
        return <CheckCircle className="w-4 h-4 text-green-500" />;
      case 'canceled':
        return <XCircle className="w-4 h-4 text-red-500" />;
    }
  };

  const getStatusText = (status: Task['status']) => {
    switch (status) {
      case 'todo':
        return 'Todo';
      case 'in-progress':
        return 'In Progress';
      case 'completed':
        return 'Completed';
      case 'canceled':
        return 'Canceled';
    }
  };

  const getPriorityColor = (priority: Task['priority']) => {
    switch (priority) {
      case 'high':
        return 'text-red-600';
      case 'medium':
        return 'text-yellow-600';
      case 'low':
        return 'text-green-600';
    }
  };

  const handleStatusChange = (status: Task['status']) => {
    onStatusChange(task.id, status);
    setDropdownOpen(false);
  };

  const handleEdit = () => {
    onEdit(task);
    setDropdownOpen(false);
  };

  const handleDelete = () => {
    if (window.confirm('Are you sure you want to delete this task?')) {
      onDelete(task.id);
    }
    setDropdownOpen(false);
  };

  return (
    <tr className="border-b border-gray-100 hover:bg-gray-50 ">
      <td className="py-4 px-4">
        <div className="font-mono text-sm text-gray-600">TASK-{task.id}</div>
      </td>
      <td className="py-4 px-4">
        <div className="flex flex-col">
          <span className="text-sm font-medium text-gray-900 mb-1">{task.title}</span>
          <span className="text-sm text-gray-600 truncate max-w-md">{task.description}</span>
        </div>
      </td>
      <td className="py-4 px-4">
        <div className="flex items-center space-x-2">
          {getStatusIcon(task.status)}
          <span className="text-sm text-gray-700">{getStatusText(task.status)}</span>
        </div>
      </td>
      <td className="py-4 px-4">
        <span className={`text-sm font-medium ${getPriorityColor(task.priority)} capitalize`}>
          {task.priority}
        </span>
      </td>
      <td className="py-4 px-4">
        <div className="relative">
          <button
            onClick={() => setDropdownOpen(!dropdownOpen)}
            className="p-1 hover:bg-gray-100 rounded"
          >
            <MoreHorizontal className="w-4 h-4 text-gray-500" />
          </button>
          
          {dropdownOpen && (
            <div className="absolute right-0 mt-1 w-48 bg-white border border-gray-200 rounded-md shadow-lg z-10">
              <div className="py-1">
                <button
                  onClick={handleEdit}
                  className="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100 w-full text-left"
                >
                  Edit Task
                </button>
                <div className="border-t border-gray-100 my-1"></div>
                <button
                  onClick={() => handleStatusChange('todo')}
                  className="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100 w-full text-left"
                >
                  Mark as Todo
                </button>
                <button
                  onClick={() => handleStatusChange('in-progress')}
                  className="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100 w-full text-left"
                >
                  Mark as In Progress
                </button>
                <button
                  onClick={() => handleStatusChange('completed')}
                  className="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100 w-full text-left"
                >
                  Mark as Completed
                </button>
                <button
                  onClick={() => handleStatusChange('canceled')}
                  className="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100 w-full text-left"
                >
                  Mark as Canceled
                </button>
                <div className="border-t border-gray-100 my-1"></div>
                <button
                  onClick={handleDelete}
                  className="block px-4 py-2 text-sm text-red-600 hover:bg-gray-100 w-full text-left"
                >
                  Delete
                </button>
              </div>
            </div>
          )}
        </div>
      </td>

      {dropdownOpen && (
        <div
          className="fixed inset-0 z-5"
          onClick={() => setDropdownOpen(false)}
        />
      )}
    </tr>
  );
};

export default TaskRow;