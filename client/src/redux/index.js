import { configureStore } from "@reduxjs/toolkit";
import postsReducer from "../redux/Reducers/PostReducer";

const store = configureStore({
  reducer: {
    postsReducer,
  },

  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware({
      serializableCheck: false,
    }),
});

export default store;
