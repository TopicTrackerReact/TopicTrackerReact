import { PreloadedState, configureStore, combineReducers } from '@reduxjs/toolkit';
import taskReducer from '../features/taskSlice';
import authReducer from '../features/authSlice';
import { taskApi } from '../features/apiSlice';
import { persistStore, persistReducer } from 'redux-persist';
import storage from 'redux-persist/lib/storage';
import { setupListeners } from '@reduxjs/toolkit/dist/query';

// const persistConfig = {
//   key: 'root',
//   storage,
// };

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
  [taskApi.reducerPath]: taskApi.reducer
});

// const persistedReducer = persistReducer(persistConfig, taskReducer);

export const setUpStore = (preloadedState?: PreloadedState<RootState>) => configureStore({
  reducer: {
    task: taskReducer,
    auth: authReducer,
    [taskApi.reducerPath]: taskApi.reducer
  },
  middleware(getDefaultMiddleware) {
    return getDefaultMiddleware().concat(taskApi.middleware)
  },
  preloadedState
})

const store = setUpStore();
setupListeners(store.dispatch)
export default store;

// export const persistor = persistStore(store);


// export default store;

export type RootState = ReturnType<typeof rootReducer>;
export type AppStore = ReturnType<typeof setUpStore>;
export type AppDispatch = AppStore['dispatch'];
// export type RootState = ReturnType<typeof store.getState>;
// export type AppDispatch = typeof store.dispatch;