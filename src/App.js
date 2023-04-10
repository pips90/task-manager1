import React from "react";
import TodoForm from "../src/components/todoForm/TodoForm";

export const App = () => {
  return (
    <div>
      <h1 className="text-center">Task Manager</h1>
      <TodoForm />
    </div>
  );
};

export default App;
