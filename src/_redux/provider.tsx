'use client';

import { Provider } from 'react-redux';
import store from './store/store';
import { ApiProvider } from '@reduxjs/toolkit/dist/query/react';
import { taskApi } from './features/apiSlice';

export const Providers = ({ children }: { children: React.ReactNode }) => {

  return (
    <Provider store={store}>
      <ApiProvider api={taskApi}>
        {children}
      </ApiProvider>
    </Provider>
  )
}