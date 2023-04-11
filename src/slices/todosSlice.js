import {
  createAsyncThunk,
  createSlice,
  isRejectedWithValue,
} from "@reduxjs/toolkit";

const initialState = {
  todoList: [],
  isFetching: false,
};

export const getTodos = createAsyncThunk("todos/fetchTodos", async () => {
  try {
    const response = await fetch("http://localhost:5000/todos");
    if (!response.ok) {
      throw new Error("Failed to fetch todos");
    }
    const data = await response.json();
    return data;
  } catch (error) {
    return isRejectedWithValue("Failed to fetch todos");
  }
});

export const addTodo = createAsyncThunk("todos/addTodo", async (newTodo) => {
  try {
    const response = await fetch("http://localhost:5000/todos", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(newTodo),
    });
    if (!response.ok) {
      throw new Error("Failed to add todo");
    }
    const data = await response.json();
    return data;
  } catch (error) {
    return isRejectedWithValue("Failed to add todo");
  }
});

export const editTodo = createAsyncThunk(
  "todos/editTodo",
  async (updatedTodo) => {
    try {
      const { id, title } = updatedTodo;
      const response = await fetch(`http://localhost:5000/todos/${id}`, {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ title }),
      });
      if (!response.ok) {
        throw new Error("Failed to edit todo");
      }
      const data = await response.json();
      return data;
    } catch (error) {
      return isRejectedWithValue("Failed to edit todo");
    }
  }
);

export const deleteTodo = createAsyncThunk(
  "todos/deleteTodo",
  async (todoId) => {
    try {
      const response = await fetch(`http://localhost:5000/todos/${todoId}`, {
        method: "DELETE",
      });
      if (!response.ok) {
        throw new Error("Failed to delete todo");
      }
      return todoId;
    } catch (error) {
      throw new Error("Failed to delete todo");
    }
  }
);
const todosSlice = createSlice({
  // name of slice
  name: "todo",

  // initial state for the slice
  initialState,

  reducers: {
    // updateTodo: (state, action) => {
    //   console.log(action.payload);
    //   state.todoList.map((todo) => {
    //     if (todo.id === action.payload.id) {
    //       todo.title = action.payload.title;
    //     }
    //     return state;
    //   });
  },
  // Define extra reducers for handling async actions
  extraReducers: (builder) => {
    builder
      .addCase(getTodos.pending, (state) => {
        state.isFetching = true;
      })
      .addCase(getTodos.fulfilled, (state, action) => {
        state.todoList = action.payload;
        state.isFetching = false;
      })
      .addCase(getTodos.rejected, (state, action) => {
        // Handle error if needed
      })
      .addCase(deleteTodo.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(deleteTodo.fulfilled, (state, action) => {
        state.loading = false;
        state.error = null;
        // Remove the deleted todo from the todoList array
        state.todoList = state.todoList.filter(
          (todo) => todo.id !== action.payload
        );
      })
      .addCase(deleteTodo.rejected, (state, action) => {
        state.loading = false;
        state.error = action.error.message;
      })
      .addCase(editTodo.fulfilled, (state, action) => {
        const { id, title } = action.payload;
        state.todoList = state.todoList.map((todo) => {
          if (todo.id === id) {
            return { ...todo, title: title };
          }
          return todo;
        });
      });
  },
});

// Extract the action creators from the slice and export them
export const {} = todosSlice.actions;

// Export the reducer function from the slice
export default todosSlice.reducer;
// to import this reducer- it's todosReducer NOT todosSlice
