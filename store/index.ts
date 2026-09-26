import { configureStore } from '@reduxjs/toolkit';
import incrementReducer from './incrementSlice';
import paymentReducer from './paymentSlice';

export const store = configureStore({
  reducer: {
    increment: incrementReducer,
    payment: paymentReducer,
  },
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
