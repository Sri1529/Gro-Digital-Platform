import { createAsyncThunk } from "@reduxjs/toolkit";
import { LoginService } from "../service/LoginService";
import { setAuthToken } from "../service";
import { setToken, setUser } from "../reducer/loginReducer";



export const LoginAction = createAsyncThunk(
  "gro/login",
  async ({ cb = () => { }, ...data }, { rejectWithValue, dispatch }) => {

    try {
      const response = await LoginService(data);
      const { accessToken, user } = response.data;

      if (!accessToken) {
        console.error("No access token in response");
        throw new Error("No access token received");
      }

      dispatch(setToken({ accessToken }));
      dispatch(setUser({ user }));
      setAuthToken(accessToken);
      window.toast.login("Login successful! Welcome back!", 4000);

      cb();
      return response?.data;
    } catch (err) {
      console.error("Login error:", err);
      const errorMessage = err.response?.data?.message || "Login failed. Please try again.";
      window.toast?.error(errorMessage, 5000);
      return rejectWithValue(err.response?.data || "Login failed");
    }
  }
);
