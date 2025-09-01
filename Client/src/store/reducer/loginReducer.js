import { createSlice } from "@reduxjs/toolkit";

const initialState = { 
  accessToken: localStorage.getItem("accessToken") || null, 
  user: { name: "", email: "" }, 
  loading: false, 
  error: null 
};

const loginSlice = createSlice({
  name: "login",
  initialState,
  reducers: {
    setToken: (state, action) => {
      state.accessToken = action.payload.accessToken;
      localStorage.setItem("accessToken", action.payload.accessToken);
    },
    setUser: (state, action) => {
      state.user = action.payload.user;
    },
    logout: (state) => {
      state.accessToken = null;
      state.user = { name: "", email: "" };
      state.loading = false;
      state.error = null;
      localStorage.removeItem("accessToken");
      sessionStorage.clear();
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase("gro/login/pending", (state) => { 
        state.loading = true; 
      })
      .addCase("gro/login/fulfilled", (state, { payload }) => {
        state.loading = false;
        state.accessToken = payload.accessToken;
        state.user = payload.user;
      })
      .addCase("gro/login/rejected", (state, action) => {
        state.loading = false;
        state.error = action.payload;
      });
  }
});

export const { setToken, setUser, logout } = loginSlice.actions;
export default loginSlice.reducer; 
