import { useState } from "react";
import { addTodo } from "../../slices/todosSlice";
import TodoList from "../todoList/TodoList";
import { v4 as uuidv4 } from "uuid";
import { useDispatch } from "react-redux";
import Button from "react-bootstrap/Button";
import { Card, Form } from "react-bootstrap";

const TodoForm = () => {
  const dispatch = useDispatch();
  const [taskValue, setTaskValue] = useState("");

  const onTaskValueChange = (event) => {
    // Track input changes
    const taskValue = event.target.value;
    setTaskValue(taskValue);
    console.log(taskValue);
  };

  const createTodo = () => {
    return {
      id: uuidv4(),
      title: taskValue,
    };
  };

  const addTask = (event) => {
    // add the task
    event.preventDefault();
    const todo = createTodo();
    console.log(todo);
    dispatch(addTodo(todo));
    setTaskValue("");
  };

  return (
    <Card style={{ width: "25rem", margin: "auto" }}>
      <Form onSubmit={addTask}>
        <div>
          <Form.Control
            onChange={onTaskValueChange}
            value={taskValue}
            name="taskName"
            placeholder="add your todo"
            className="w-50 mx-auto"
          />
        </div>

        {/* <button type="submit">add</button> */}
        <div className="d-flex justify-content-center mx-auto">
          <Button type="submit" className="w-50">
            add
          </Button>
        </div>
      </Form>
      <div>
        {/* this is what shows the user the todos/tasks */}
        <TodoList />
      </div>
    </Card>
  );
};

export default TodoForm;
