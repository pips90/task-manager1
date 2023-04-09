import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  todoList: [],
};
const todosSlice = createSlice({
  // name of slice
  name: "todo",

  // initial state for the slice
  initialState,

  reducers: {
    // reducer to manage todos

    addTodo: (state, action) => {
      // spreading state, and adding the new data(todo-which is the payload) to the array
      state.todoList.push(action.payload);
    },
    updateTodo: (state, action) => {
      console.log(action.payload);
      state.todoList.map((todo) => {
        if (todo.id === action.payload.id) {
          todo.title = action.payload.title;
        }
        return state;
      });
    },
    deleteTodo: (state, action) => {
      // delete the todo/task
      state.todoList = state.todoList.filter(
        (todo) => todo.id !== action.payload.id
      );
    },
  },
});

// Extract the action creators from the slice and export them
export const { addTodo, updateTodo, deleteTodo } = todosSlice.actions;

// Export the reducer function from the slice
export default todosSlice.reducer;
// to import this reducer- it's todosReducer NOT todosSlice
