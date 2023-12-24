import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { useFormik } from "formik";
import * as Yup from "yup";

import { Login } from "@mui/icons-material";
import {
  Box,
  Button,
  Container,
  CssBaseline,
  FormControl,
  FormHelperText,
  Grid,
  Paper,
  TextField,
  Typography,
  ThemeProvider,
  createTheme,
  CircularProgress,
} from "@mui/material";
import Axios from "axios";
import OAuth from "./OAuth";

export default function SignUp() {
  const navigate = useNavigate();
  const [error, setError] = useState(false);
  const [loading, setLoading] = useState(false);

  // Function to get error message based on status code
  const getErrorMessage = (statusCode) => {
    switch (statusCode) {
      case 401:
        return "Invalid credentials";
      case 409:
        return "User already exists";
      default:
        return "An error occurred";
    }
  };
  const defaultTheme = createTheme();

  // Define validation schema using Yup
  const validationSchema = Yup.object().shape({
    email: Yup.string().email("Invalid email").required("Email is required"),
    password: Yup.string("Invalid Password")
      .matches(
        /^(?=.*\d)(?=.*[a-z])(?=.*[A-Z])(?=.*[\W_]).{8,}$/,
        "Password must be at least 8 characters long, contain at least one lowercase letter, one uppercase letter, one digit, and one special character."
      )
      .required("Password is required"),
  });

  // API URL
  const apiUrl = process.env.REACT_APP_API_URL;

  // Initialize formik
  const formik = useFormik({
    initialValues: {
      fullName:"",
      email: "",
      password: "",
    },
    validationSchema: validationSchema,
    validateOnChange: false,
    validateOnBlur: true,
    onSubmit: async (values) => {
      try {
        setLoading(true);
        const response = await Axios.post(`${apiUrl}/api/auth/signup`, values);
        setLoading(false);
        formik.resetForm();
        navigate('/')
        console.log("Response : ", response);
      } catch (error) {
        setLoading(false);
        setError(error);
        console.log("Error", error);
      }
    },
  });

  // Handle input change
  const handleInputChange = (e) => {
    e.preventDefault();
    const { name, value } = e.target;
    formik.setValues({ ...formik.values, [name]: value });
  };

  // Function to render text fields
  const renderTextField = (name, label, type) => (
    <FormControl fullWidth>
      <TextField
        id={name}
        name={name}
        type={type}
        value={formik.values[name]}
        onChange={handleInputChange}
        label={label}
      />
      {formik.errors[name] && (
        <FormHelperText style={{ color: "red" }}>
          {formik.errors[name]}
        </FormHelperText>
      )}
    </FormControl>
  );

  return (
    <ThemeProvider theme={defaultTheme}>
      <Container component="main">
        <CssBaseline />
        <Grid
          container
          component="main"
          sx={{ height: "100vh", paddingY: "2%" }}
        >
          <Grid
            item
            xs={false}
            sm={4}
            md={7}
            sx={{
              backgroundImage:
                "url(https://source.unsplash.com/random?wallpapers)",
              backgroundRepeat: "no-repeat",
              backgroundColor: (t) =>
                t.palette.mode === "light"
                  ? t.palette.grey[50]
                  : t.palette.grey[900],
              backgroundSize: "cover",
              backgroundPosition: "center",
            }}
          />
          <Grid
            item
            xs={12}
            sm={8}
            md={5}
            component={Paper}
            elevation={6}
            square
            className="flex items-center justify-center"
          >
            <Box noValidate>
              <div className="flex flex-col items-center">
                <h1 className="text-2xl xl:text-3xl font-extrabold">Sign Up</h1>
                <OAuth />
              </div>
              <div className="my-6 border-b text-center">
                <div className="leading-none px-2 inline-block text-sm text-gray-600 tracking-wide font-medium bg-white transform translate-y-1/2">
                  Or Sign Up with Email
                </div>
              </div>
              <Box component="form" noValidate>
                <Grid
                  container
                  className="flex justify-center"
                  sx={{ width: "330px", margin: "auto" }}
                >
                  <Grid
                    item
                    xs={12}
                    sm={12}
                    paddingBottom={2}
                    paddingInline={1}
                  >
                    {renderTextField("fullName", "Fullname", "fullName")}
                  </Grid>
                  <Grid
                    item
                    xs={12}
                    sm={12}
                    paddingBottom={2}
                    paddingInline={1}
                  >
                    {renderTextField("email", "Email", "email")}
                  </Grid>
                  <Grid
                    item
                    xs={12}
                    sm={12}
                    paddingBottom={2}
                    paddingInline={1}
                  >
                    {renderTextField("password", "Password", "password")}
                  </Grid>
                  <Typography sx={{ color: "red", textAlign: "center" }}>
                    {error
                      ? error.response
                        ? getErrorMessage(error.response.status)
                        : error.message || "Something went wrong"
                      : ""}
                  </Typography>
                  <Grid
                    item
                    xs={12}
                    sm={12}
                    paddingBottom={2}
                    paddingInline={1}
                  >
                    <Button
                      fullWidth
                      type="submit"
                      variant="contained"
                      onClick={(e) => {
                        e.preventDefault();
                        formik.handleSubmit();
                      }}
                      disabled={loading}
                      sx={{
                        marginTop: "1.25rem",
                        letterSpacing: "0.05em",
                        fontWeight: 600,
                        color: "#FFFFFF",
                        width: "100%",
                        padding: "1rem 0",
                        transition: "background-color 0.3s ease-in-out",
                        display: "flex",
                        alignItems: "center",
                        justifyContent: "center",
                        outline: 0,
                        borderRadius: "10px",
                        boxShadow: "0 0 0 3px rgba(100, 126, 234, 0.5)",
                      }}
                    >
                      {loading ? (
                        <CircularProgress size={30} />
                      ) : (
                        <>
                          <Login fontSize="medium" className="mr-3" />
                          <Typography
                            sx={{ fontSize: "18px", marginTop: "3px" }}
                          >
                            Sign Up
                          </Typography>
                        </>
                      )}
                    </Button>
                  </Grid>
                </Grid>
                <Typography sx={{ textAlign: "center", marginTop: "10px" }}>
                  <Link to="/signin" variant="body2">
                    Already have an account? Sign in
                  </Link>
                </Typography>
              </Box>
            </Box>
          </Grid>
        </Grid>
      </Container>
    </ThemeProvider>
  );
}