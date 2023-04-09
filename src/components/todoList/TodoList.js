import { useState } from "react";
import { updateTodo, deleteTodo } from "../../slices/todosSlice";
import { useDispatch, useSelector } from "react-redux";

const TodoList = () => {
  const editedTodoInitState = {
    id: "",
    title: "",
  };

  const dispatch = useDispatch();
  const todoList = useSelector((state) => state.todos.todoList);

  const [selectedTodo, setSelectedTodo] = useState({});
  const [editedTodo, setEditedTodo] = useState(editedTodoInitState);

  const selectTodo = (todo) => {
    setSelectedTodo(todo);
    setEditedTodo({
      ...editedTodo,
      id: todo.id,
      title: todo.title,
    });
  };

  const handleEdit = () => {
    dispatch(updateTodo(editedTodo));
  };

  const handleDelete = () => {
    dispatch(deleteTodo(editedTodo));
    setEditedTodo(editedTodoInitState);
  };

  return (
    <div>
      {<h1>todo list</h1>}
      {todoList.map((todo) => (
        <div key={todo.id}>
          <p>{todo.title}</p>
          {<button onClick={() => selectTodo(todo)}>select</button>}
        </div>
      ))}
      {selectedTodo && (
        <div>
          <input
            type="text"
            value={editedTodo.title}
            onChange={(e) =>
              setEditedTodo({
                ...editedTodo,
                title: e.target.value,
              })
            }
          />
          <button onClick={handleEdit}>Edit</button>
          <button onClick={handleDelete}>Delete</button>
        </div>
      )}
    </div>
  );
};

export default TodoList;
