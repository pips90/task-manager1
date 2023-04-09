import { configureStore } from "@reduxjs/toolkit";
import todosReducer from "../slices/todosSlice";
// Create the Redux store with the todosReducer as the reducer for the 'todos' slice
const store = configureStore({
  reducer: {
    todos: todosReducer,
  },
});

// export const useAppDispatch = () => useDispatch();
// export const useAppSelector = useSelector; // Update useAppSelector to use TypedUseSelectorHook<RootState>

// Export the store so it can be used in your application
export default store;
