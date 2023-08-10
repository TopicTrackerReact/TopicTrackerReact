import { createSlice } from "@reduxjs/toolkit";
import type { PayloadAction } from '@reduxjs/toolkit'


const initialState = {
  userId: '',
}

export const authSlice = createSlice({
  name: 'auth',
  initialState,
  reducers: {
    updateUser(state, action: PayloadAction<string>) {
      state.userId = action.payload;
    }
  }
});

export const { updateUser } = authSlice.actions;
export default authSlice.reducer;