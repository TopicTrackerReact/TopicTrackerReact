import { PreloadedState, configureStore, combineReducers } from '@reduxjs/toolkit';
import taskReducer from '../features/taskSlice';
import authReducer from '../features/authSlice';
import { taskApi } from '../features/apiSlice';

const preloadedState = {
  task: {
    taskCache: {},
    taskNames: {},
    maxId: 0,
    totalTasks: 0,
  },
  auth: {
    userStatus: false
  }
};

const rootReducer = combineReducers({
  task: taskReducer,
  auth: authReducer,
  taskApi: taskApi.reducer
});

export const setUpStore = (preloadedState?: PreloadedState<RootState>) => configureStore({
  reducer: {
    task: taskReducer,
    auth: authReducer,
    taskApi: taskApi.reducer
  },
  middleware(getDefaultMiddleware) {
    return getDefaultMiddleware().concat(taskApi.middleware)
  },
  preloadedState
})

const store = setUpStore();
export default store;


// export default store;

export type RootState = ReturnType<typeof rootReducer>;
export type AppStore = ReturnType<typeof setUpStore>;
export type AppDispatch = AppStore['dispatch'];
// export type RootState = ReturnType<typeof store.getState>;
// export type AppDispatch = typeof store.dispatch;