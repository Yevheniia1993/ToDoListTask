import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  todoList: [],
  activePage: 1,
};
// Create slice for TODO list
export const todoListSlice = createSlice({
  name: "todoList",
  initialState,
  reducers: {
    setPage: (state, action) => {
      state.todoList = action.payload.data;
      state.activePage = action.payload.pageNumber;
    },
    deleteItem: (state, action) => {
      state.todoList = action.payload;
    },
    addNewItem: (state, action) => {
      state.todoList = action.payload.data;
    },
    changeItem: (state, action) => {
      state.todoList = action.payload.data;
    },
  },
});

export const { setPage, changeItem, addNewItem } = todoListSlice.actions;

export default todoListSlice.reducer;
