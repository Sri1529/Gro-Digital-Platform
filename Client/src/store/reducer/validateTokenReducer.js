import { createSlice } from "@reduxjs/toolkit";
import { ValidateTokenAction } from "../actions/validateTokenAction";

const initialState = {
  isValid: false,
  user: null,
  loading: false,
  error: null,
  lastValidated: null
};

const validateTokenSlice = createSlice({
  name: "validateToken",
  initialState,
  reducers: {
    resetValidation: (state) => {
      state.isValid = false;
      state.user = null;
      state.error = null;
      state.lastValidated = null;
    },
    setValidationStatus: (state, action) => {
      state.isValid = action.payload.isValid;
      state.user = action.payload.user;
      state.lastValidated = new Date().toISOString();
    }
  },
  extraReducers: (builder) => {
    builder
      .addCase(ValidateTokenAction.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(ValidateTokenAction.fulfilled, (state, { payload }) => {
        state.loading = false;
        state.isValid = true;
        state.user = payload.user;
        state.error = null;
        state.lastValidated = new Date().toISOString();
      })
      .addCase(ValidateTokenAction.rejected, (state, action) => {
        state.loading = false;
        state.isValid = false;
        state.user = null;
        state.error = action.payload;
        state.lastValidated = new Date().toISOString();
      });
  }
});

export const { resetValidation, setValidationStatus } = validateTokenSlice.actions;
export default validateTokenSlice.reducer;
