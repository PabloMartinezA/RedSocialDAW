import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  chatUser: null,
}

const chatSlice = createSlice({
  name: "chat",
  initialState,
  reducers: {
    setChatUser: (state, action) => {
      state.chatUser = action.payload.user;
    },
    clearChatUser: (state) => {
      state.chatUser = initialState.chatUser;
    },
  }
});

const { actions, reducer } = chatSlice;
export const { setChatUser, clearChatUser } = actions;
export default reducer;