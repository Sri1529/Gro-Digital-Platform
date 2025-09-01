import { createAsyncThunk } from "@reduxjs/toolkit";
import { SignupService } from "../../service/signupService";


export const SignupAction = createAsyncThunk(
  "gro/signup",
  async ({ cb = () => {}, ...data }, { rejectWithValue }) => {
    try {
      const response = await SignupService(data);

     if(response?.data?.message === "User signed up successfully")
     {
      cb()
     }

      return response?.data;
    } catch (err) {
      console.error("Signup error:", err);
      return rejectWithValue(err.response?.data || "Signup failed");
    }
  }
);



