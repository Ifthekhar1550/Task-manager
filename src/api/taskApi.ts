import  type { Task } from '../components/Types';


const isDevelopment = !window.location.href.includes('vercel.app') && 
                     !window.location.href.includes('netlify.app') &&
                     window.location.hostname === 'localhost';

const API_URL = isDevelopment 
  ? 'http://localhost:3001/tasks'
  : 'https://jsonplaceholder.typicode.com/posts'; 


export const getTasks = async (): Promise<Task[]> => {
  const response = await fetch(API_URL);
  if (!response.ok) {
    throw new Error('Failed to fetch tasks');
  }
  return response.json();
};


export const addTask = async (task: Omit<Task, 'id'>): Promise<Task> => {
  const response = await fetch(API_URL, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify(task),
  });
  if (!response.ok) {
    throw new Error('Failed to add task');
  }
  return response.json();
};


export const updateTask = async (id: number, task: Omit<Task, 'id'>): Promise<Task> => {
  const response = await fetch(`${API_URL}/${id}`, {
    method: 'PUT',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify({ ...task, id }),
  });
  if (!response.ok) {
    throw new Error('Failed to update task');
  }
  return response.json();
};


export const deleteTask = async (id: number): Promise<void> => {
  const response = await fetch(`${API_URL}/${id}`, {
    method: 'DELETE',
  });
  if (!response.ok) {
    throw new Error('Failed to delete task');
  }
};