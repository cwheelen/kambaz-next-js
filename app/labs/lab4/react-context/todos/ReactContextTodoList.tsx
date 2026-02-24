"use client";
import { Button, FormControl, ListGroup, ListGroupItem } from "react-bootstrap";
import { TodosProvider, useTodos } from "./todosContext";

function TodoListInner() {
  const { todos, todo, setTodo, addTodo, deleteTodo, updateTodo } = useTodos();
  return (
    <div>
      <h2>Todo List</h2>
      <ListGroup>
        <ListGroupItem>
          <Button onClick={() => addTodo(todo)} id="wd-add-todo-click"> Add </Button>
          <Button onClick={() => updateTodo(todo)} id="wd-update-todo-click"> Update </Button>
          <FormControl
            value={todo.title}
            onChange={(e) => setTodo({ ...todo, title: e.target.value })} />
        </ListGroupItem>
        {todos.map((t) => (
          <ListGroupItem key={t.id}>
            <Button onClick={() => deleteTodo(t.id)} id="wd-delete-todo-click"> Delete </Button>
            <Button onClick={() => setTodo(t)} id="wd-set-todo-click"> Edit </Button>
            {t.title}
          </ListGroupItem>
        ))}
      </ListGroup>
      <hr />
    </div>
  );
}

export default function ReactContextTodoList() {
  return (
    <TodosProvider>
      <TodoListInner />
    </TodosProvider>
  );
}