import axios from "axios";

export interface Task {
  id?: number;
  title: string;
  description: string;
  status: "pending" | "in-progress" | "completed";
}

const API_URL = "http://localhost:5000";


export const getTasks = () => {
  return axios.get<Task[]>(API_URL);
};

export const addTask = (task: Task) => {
  return axios.post<Task>(API_URL, task);
};
export const updateTask = (id: number, updatedTask: Task) => {
  return axios.put<Task>(`${API_URL}/${id}`, updatedTask);
};

export const deleteTask = (id: number) => {
  return axios.delete(`${API_URL}/${id}`);
};
