import { configureStore } from "@reduxjs/toolkit";
import SignupReducer from "./signupReducer";
import Loginreducer from "./loginReducer";
import ValidateTokenReducer from "./validateTokenReducer";

const loggerMiddleware = (storeAPI) => (next) => (action) => {
  console.log("Dispatching Action:", action);
  console.log("State BEFORE:", storeAPI.getState());

  const result = next(action);

  console.log(" State AFTER:", storeAPI.getState());
  return result;
};

const store = configureStore({
  reducer: {
    signup: SignupReducer,
    login: Loginreducer,
    validateToken: ValidateTokenReducer
  },
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware({
      serializableCheck: {
        ignoredActions: ['persist/PERSIST', 'persist/REHYDRATE'],
      },
    }).concat(loggerMiddleware),
});

export default store;
