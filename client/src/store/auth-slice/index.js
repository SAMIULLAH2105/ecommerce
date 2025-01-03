import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import axios from "axios";

const initialState = {
  isAuthenticated: false,
  isLoading: true,
  user: null,
};

export const registerUser = createAsyncThunk(
  "auth/registerUser",  // More descriptive action type
  async (formData) => {
    const response = await axios.post(
      "http://localhost:5000/api/auth/register",
      formData,
      {
        withCredentials: true,
      }
    );
    return response.data;
  }
);

export const loginUser = createAsyncThunk(
  "auth/login",  // More descriptive action type
  async (formData) => {
    const response = await axios.post(
      "http://localhost:5000/api/auth/login",
      formData,
      {
        withCredentials: true,
      }
    );
    return response.data;
  }
);

export const logoutUser = createAsyncThunk(
  "auth/logout",  // More descriptive action type
  async () => {
    const response = await axios.post(
      "http://localhost:5000/api/auth/logout",
      {},
      {
        withCredentials: true,
      }
    );
    return response.data;
  }
);

export const checkAuth = createAsyncThunk(
  "auth/checkAuth",  // More descriptive action type
  async () => {
    const response = await axios.get(
      "http://localhost:5000/api/auth/check-auth",
      
      {
        withCredentials: true,
        headers:{
        'Cache-Control':'no-store,no-cache,msut-revalidate,proxy-revalidate'
      }
      }
    );
    return response.data;
  }
);

const authSlice = createSlice({
  name: "auth",
  initialState,
  reducers: {
    setUser: (state, action) => {
      state.user = action.payload;
      state.isAuthenticated = true;
    },
  },

  extraReducers: (builder) => {
    builder
    // register
      .addCase(registerUser.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(registerUser.fulfilled, (state, action) => {
        state.isLoading = false;
        state.user = null;  // Set user data from API response
        state.isAuthenticated = false;  // Set authenticated to true
      })
      .addCase(registerUser.rejected, (state, action) => {
        state.isLoading = false;
        state.user = null;
        state.isAuthenticated = false;
        console.error("Registration error:", action.error.message);  // Log the error
      })
      //login
      .addCase(loginUser.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(loginUser.fulfilled, (state, action) => {
        state.isLoading = false;
        state.user = action.payload.success ? action.payload.user : null; 
        state.isAuthenticated = action.payload.success ; 
      })
      .addCase(loginUser.rejected, (state, action) => {
        state.isLoading = false;
        state.user = null;
        state.isAuthenticated = false;
        console.error("login error in authsilce:", action.error.message);  
      })
      // Check Auth
      .addCase(checkAuth.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(checkAuth.fulfilled, (state, action) => {
        state.isLoading = false;
        state.user = action.payload.success ? action.payload.user : null; 
        state.isAuthenticated = action.payload.success ; 
      })
      .addCase(checkAuth.rejected, (state, action) => {
        state.isLoading = false;
        state.user = null;
        state.isAuthenticated = false;
        console.error("CheckAuth error in authsilce:", action.error.message);  
      })
      .addCase(logoutUser.fulfilled, (state, action) => {
        state.isLoading = false;
        state.user =null; 
        state.isAuthenticated = false ; 
      });
  },
});

export const { setUser } = authSlice.actions;
export default authSlice.reducer;
