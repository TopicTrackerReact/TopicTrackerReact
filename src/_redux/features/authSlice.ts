import { createSlice } from "@reduxjs/toolkit";
import type { PayloadAction } from '@reduxjs/toolkit'


const initialState = {
  userStatus: false,
}

export const authSlice = createSlice({
  name: 'auth',
  initialState,
  reducers: {
    login(state) {
      state.userStatus = true;
    },
    logout(state) {
      state.userStatus = false;
    }
  }
});

export const { login, logout } = authSlice.actions;
export default authSlice.reducer;