import { createSlice } from "@reduxjs/toolkit";
import type { PayloadAction } from '@reduxjs/toolkit'


interface Task {
  id: number,
  taskName: string,
  notes: string,
  isCompleted: boolean,
}

const Task = {
  id: 0,
  taskName: '',
  notes: '',
  isCompleted: false,
}

interface InitialState {
  taskCache: {
    [id: number]: Task
  },
  taskNames: {
    [id: string]: number
  },
  totalTasks: number,
  maxId: number
}

const initialState: InitialState = {
  taskCache: {},
  taskNames: {},
  totalTasks: 0,
  maxId: 0,
}

export const taskSlice = createSlice({
  name: 'task',
  initialState,
  reducers: {
    // For when user creates new task in input (input === string)
    createTask(state, action: PayloadAction<string>) {

      state.taskCache[state.maxId] = { ...Task, taskName: action.payload.toUpperCase(), id: state.maxId };
      state.taskNames[action.payload] = state.maxId;
      state.totalTasks++;
      state.maxId++;

    },
    // When user opens modal
    updateTask(state, action: PayloadAction<Task>) {
      const { id, taskName: newName } = action.payload;
      delete state.taskNames[state.taskCache[id].taskName]

      state.taskNames[newName] = id;
      state.taskCache[id] = action.payload;
    },
    // When user toggles complete button
    updateCompleted(state, action: PayloadAction<number>) {
      state.taskCache[action.payload].isCompleted = state.taskCache[action.payload].isCompleted === true ? false : true;
    },
    deleteTask(state, action: PayloadAction<number>) {
      delete state.taskCache[action.payload];
      state.totalTasks--
    }
  }
})

// Action creators are generated for each case reducer function
export const { createTask, updateTask, updateCompleted, deleteTask } = taskSlice.actions

export default taskSlice.reducer
