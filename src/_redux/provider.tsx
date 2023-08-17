'use client';

import { Provider } from 'react-redux';
import store from './store/store';
// import persistor from './store/store';
import { taskApi } from './features/apiSlice';
// import { PersistGate } from 'redux-persist/integration/react';

export const Providers = ({ children }: { children: React.ReactNode }) => {

  return (
    <Provider store={store}>
      {/* <PersistGate loading={null} persistor={persistor}> */}
      {children}
      {/* </PersistGate> */}
    </Provider>
  )
}