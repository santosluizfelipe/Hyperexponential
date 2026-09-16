import { configureStore } from "@reduxjs/toolkit";
import { setupListeners } from "@reduxjs/toolkit/query";

import { payApi } from "@/api/payApi";

export const store = configureStore({
  reducer: { [payApi.reducerPath]: payApi.reducer },
  middleware: (getDefaultMiddleware) => getDefaultMiddleware().concat(payApi.middleware)
});

setupListeners(store.dispatch);

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
