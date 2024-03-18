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
  }
});

const { actions, reducer } = chatSlice;
export const { setChatUser } = actions;
export default reducer;