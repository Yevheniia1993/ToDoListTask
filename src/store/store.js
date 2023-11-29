import { configureStore } from "@reduxjs/toolkit";
import todoListReducer from "./reducers/todoListReducer";
// Create store function for aplication
export const store = configureStore({
  reducer: { list: todoListReducer },
});

export default store;
