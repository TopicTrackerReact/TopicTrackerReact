import { createSlice } from "@reduxjs/toolkit";
import type { PayloadAction } from '@reduxjs/toolkit'


interface Task {
  taskName: string,
  notes: string,
  isCompleted: boolean,
}

const Task = {
  taskName: '',
  notes: '',
  isCompleted: false,
}

interface InitialState {
  taskCache: {
    [key: string]: Task
  },
  totalTasks: number,
}

const initialState: InitialState = {
  taskCache: {},
  totalTasks: 0,
}

export const taskSlice = createSlice({
  name: 'task',
  initialState,
  reducers: {
    createTask(state, action: PayloadAction<string>) {
      state.taskCache[action.payload] = { ...Task, taskName: action.payload };
      state.totalTasks++;
    },
    updateTask(state, action: PayloadAction<Task>) {
      state.taskCache[action.payload.taskName] = action.payload;
    },
    updateCompleted(state, action: PayloadAction<string>) {
      state.taskCache[action.payload].isCompleted === true ? false : true;
    },
    deleteTask(state, action: PayloadAction<string>) {
      delete state.taskCache[action.payload];
      state.totalTasks--
    }
  }
})

// Action creators are generated for each case reducer function
export const { createTask, updateTask, updateCompleted, deleteTask } = taskSlice.actions

export default taskSlice.reducer
