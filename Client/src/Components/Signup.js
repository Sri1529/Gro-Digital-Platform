import  { useState } from "react";
import { useDispatch } from "react-redux";

import {
  Container,
  TextField,
  Button,
  Typography,
  Box,
  Link,
  Paper,
} from "@mui/material";
import { useNavigate } from "react-router-dom";
 import { SignupAction } from "../store/actions/signupAction";


const Signup = ({ onSwitch }) => {
  const [form, setForm] = useState({ name: "", email: "", password: "" });
  const dispatch = useDispatch()
  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };
const navigate = useNavigate()

  const handleSubmit = (e) => {
    e.preventDefault();
    
    // Show loading toast
    window.toast?.info("Creating your account...", 2000);
    
    dispatch(SignupAction({...form,cb:()=>{
      window.toast?.signup("Account created successfully! Please login.", 4000);
      navigate("/login");
    }}));
  };


  return (
    <Container maxWidth="sm">
      <Paper elevation={4} sx={{ p: 4, mt: 8, borderRadius: 3 }}>
        <Typography variant="h5" gutterBottom>
          Sign Up
        </Typography>
        <Box component="form" onSubmit={handleSubmit}>
          <TextField
            fullWidth
            margin="normal"
            label="Name"
            name="name"
            value={form.name}
            onChange={handleChange}
            required
          />
          <TextField
            fullWidth
            margin="normal"
            label="Email"
            name="email"
            type="email"
            value={form.email}
            onChange={handleChange}
            required
          />
          <TextField
            fullWidth
            margin="normal"
            label="Password"
            name="password"
            type="password"
            value={form.password}
            onChange={handleChange}
            required
          />
          <Button
            type="submit"
            variant="contained"
            fullWidth
            sx={{ mt: 2, py: 1.2 }}
          >
            Sign Up
          </Button>
          <Typography variant="body2" sx={{ mt: 2 }}>
            Already have an account?{" "}
            <Link component="button" onClick={()=>navigate("/login")}>
              Login
            </Link>
          </Typography>
        </Box>
      </Paper>
    </Container>
  );
};

export default Signup;
