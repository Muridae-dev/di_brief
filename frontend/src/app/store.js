import { configureStore } from '@reduxjs/toolkit';
// Gets the default from slice, which is the reducer
import authReducer from '../features/auth/authSlice';
import itemReducer from "../features/items/itemSlice";
import tradeReducer from "../features/trade/tradeSlice";

console.log(itemReducer);

export const store = configureStore({
  reducer: {
    auth: authReducer,
    items: itemReducer,
    trades: tradeReducer,
  },
});
