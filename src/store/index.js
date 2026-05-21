import { configureStore } from '@reduxjs/toolkit';
import reducers from './reducers';
import { getTokenInfo } from '@/utils/storage';

const tokenInfo = getTokenInfo();

const store = configureStore({
  reducer: reducers,
  preloadedState: {
    login: tokenInfo || undefined,
  },
  devTools: process.env.NODE_ENV !== 'production',
});

export default store;