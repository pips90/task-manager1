import { useEffect, useState } from "react";
import { editTodo, deleteTodo, getTodos } from "../../slices/todosSlice";
import { useDispatch, useSelector } from "react-redux";
import { Button, Card, Form } from "react-bootstrap";

const TodoList = () => {
  const editedTodoInitState = {
    id: "",
    title: "",
  };

  const dispatch = useDispatch();
  const todoList = useSelector((state) => state.todos.todoList);
  // const isFetching = useSelector((state) => state.todos.isFetching);

  const [selectedTodo, setSelectedTodo] = useState({});
  const [editedTodo, setEditedTodo] = useState(editedTodoInitState);
  const [isVisible, setIsVisible] = useState("invisible");

  const selectTodo = (todo) => {
    setSelectedTodo(todo);
    setIsVisible("visible");
    setEditedTodo({
      ...editedTodo,
      id: todo.id,
      title: todo.title,
    });
  };

  useEffect(() => {
    dispatch(getTodos());
  }, []);

  const handleEdit = () => {
    dispatch(editTodo(editedTodo));
    setIsVisible("invisible");
  };

  const handleDelete = () => {
    dispatch(deleteTodo(editedTodo.id));
    setEditedTodo(editedTodoInitState);
    setIsVisible("invisible");
  };

  return (
    <Form>
      {<h5 className="text-center">Task List</h5>}
      {todoList.map((todo) => (
        <Card
          key={todo.id}
          className="d-flex justify-content-center mx-auto w-50"
        >
          <p>{todo.title}</p>
          {
            <Button onClick={() => selectTodo(todo)} className="w-50">
              select
            </Button>
          }
        </Card>
      ))}
      {selectedTodo && (
        <div className={isVisible}>
          <Form.Control
            type="text"
            value={editedTodo.title}
            onChange={(e) =>
              setEditedTodo({
                ...editedTodo,
                title: e.target.value,
              })
            }
            className="w-50 mx-auto"
          />
          <div className="d-flex justify-content-center mx-auto">
            <Button onClick={handleEdit} className="w-25">
              Edit
            </Button>{" "}
            {""}
            <Button onClick={handleDelete} className="w-25">
              Delete
            </Button>
          </div>
        </div>
      )}
    </Form>
  );
};

export default TodoList;
