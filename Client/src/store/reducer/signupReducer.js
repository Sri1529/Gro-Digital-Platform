import { createSlice } from "@reduxjs/toolkit";
import { SignupAction } from "../actions/signupAction";


const initialState =
{
    list: { name: "", email: "" },
    loading: false,
    error: null,
}

export const SignupReducer = createSlice({
    name: "signup",
    initialState,
    reducers: {},

    extraReducers: (builder) => {
        builder
            .addCase(SignupAction.pending, (state) => {
                state.loading = true;
            })

            .addCase(SignupAction.fulfilled, (state, { payload }) => {
                state.loading = false;
                state.list = { ...payload?.user };
            })

            .addCase(SignupAction.rejected, (state) => {
                state.loading = false;
            });
    }

})
export default SignupReducer.reducer; 