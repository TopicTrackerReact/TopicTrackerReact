import { createSlice } from "@reduxjs/toolkit";
import type { PayloadAction } from '@reduxjs/toolkit'


const initialState = {
  userStatus: false,
  email: ''
}

export const authSlice = createSlice({
  name: 'auth',
  initialState,
  reducers: {
    login(state, action: PayloadAction<string>) {
      state.userStatus = true;
      state.email = action.payload;
    },
    logout(state) {
      state.userStatus = false;
      state.email = '';
    }
  }
});

export const { login, logout } = authSlice.actions;
export default authSlice.reducer;