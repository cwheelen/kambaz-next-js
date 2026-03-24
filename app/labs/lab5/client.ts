/* eslint-disable @typescript-eslint/no-explicit-any */
import axios from "axios";

const HTTP_SERVER = process.env.NEXT_PUBLIC_HTTP_SERVER;
const TODOS_API = `${HTTP_SERVER}/lab5/todos`;
const ASSIGNMENT_API = `${HTTP_SERVER}/lab5/assignment`;

export const fetchWelcomeMessage = async () => {
  const response = await axios.get(`${HTTP_SERVER}/lab5/welcome`);
  return response.data;
};

export const fetchAssignment = async () => {
  const response = await axios.get(`${ASSIGNMENT_API}`);
  return response.data;
};

export const updateTitle = async (title: string) => {
  const response = await axios.get(`${ASSIGNMENT_API}/title/${title}`);
  return response.data;
};

export const fetchTodos = async () => {
  const response = await axios.get(TODOS_API);
  return response.data;
};

export const removeTodo = async (todo: any) => {
  const response = await axios.get(`${TODOS_API}/${todo.id}/delete`);
  return response.data;
};

export const createNewTodo = async () => {
  const response = await axios.get(`${TODOS_API}/create`);
  return response.data;
};