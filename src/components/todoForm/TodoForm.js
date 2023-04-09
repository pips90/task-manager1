import { useState } from "react";
import { addTodo } from "../../slices/todosSlice";
import TodoList from "../todoList/TodoList";
import { v4 as uuidv4 } from "uuid";
import { useDispatch } from "react-redux";

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
    <div>
      <form onSubmit={addTask}>
        <input
          onChange={onTaskValueChange}
          value={taskValue}
          name="taskName"
          placeholder="add your todo"
        />
        <button type="submit">add</button>
      </form>
      <div>
        {/* this is what shows the user the todos/tasks */}
        <TodoList />
      </div>
    </div>
  );
};

export default TodoForm;
