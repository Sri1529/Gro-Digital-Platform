import { createAsyncThunk } from "@reduxjs/toolkit";
import { ValidateTokenService } from "../service/ValidateTokenService";

export const ValidateTokenAction = createAsyncThunk(
  "gro/validateToken",
  async (_, { rejectWithValue }) => {
    try {
      const response = await ValidateTokenService();
      return response?.data;
    } catch (err) {
      console.error("Token validation error:", err);
      const errorMessage = err.response?.data?.message || "Token validation failed";
      window.toast?.error(errorMessage, 5000);
      return rejectWithValue(err.response?.data || "Token validation failed");
    }
  }
);
