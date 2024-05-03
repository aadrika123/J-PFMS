import { configureStore } from "@reduxjs/toolkit";
import PopupReducers from "./reducers/PopupReducers";
import authReducer from "./reducers/authReducer";

// ...
const store = configureStore({
  reducer: {
    popup: PopupReducers,
    user: authReducer
  },
});
export type RootState = ReturnType<typeof store.getState>;

export default store;
