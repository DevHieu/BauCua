import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  users: [],
  messages: [],
};

export const roomSlice = createSlice({
  name: "room",
  initialState,
  reducers: {
    addUser(state, action) {
      state.users.push(action.payload);
    },
    removeUser(state, action) {
      const index = state.users.findIndex((user) => user.id === action.payload);
      state.users.splice(index, 1);
    },
    addMessage(state, action) {
      state.messages.push(action.payload);
    },
  },
});

export const { addUser, removeUser, addMessage } = roomSlice.actions;

export default roomSlice.reducer;
