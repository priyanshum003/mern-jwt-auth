// src/features/authSlice.js

import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import axios from 'axios';

// Async Thunk for User Login
export const loginUser = createAsyncThunk('auth/login', async (formData) => {
  try {
    const response = await axios.post(`/api/auth/login`, formData, { withCredentials: true });
    return response.data;
  } catch (error) {
    throw error.response.data;
  }
});

// Async Thunk for User Registration
export const registerUser = createAsyncThunk('auth/register', async (formData) => {
  try {
    const response = await axios.post('/api/auth/register', formData);
    return response.data;
  } catch (error) {
    throw error.response.data;
  }
});

// Async Thunk for Fetching User Data
export const fetchData = createAsyncThunk('auth/fetchData', async () => {
  try {
    const response = await axios.get('/api/dashboard', { withCredentials: true });
    return response.data;
  } catch (error) {
    throw error.response.data;
  }
});

// Async Thunk for User Logout
export const logoutUser = createAsyncThunk('auth/logout', async () => {
  try {
    const response = await axios.get('/api/auth/logout', { withCredentials: true });
    return response.data;
  } catch (error) {
    throw error.response.data;
  }
});

// Async Thunk to check Auth Status
export const checkAuthStatus = createAsyncThunk('auth/checkAuthStatus', async () => {
  try {
    const response = await axios.get('/api/auth/check-auth', { withCredentials: true });
    return response.data;
  } catch (error) {
    throw error.response.data;
  }
});

// Auth Slice
const authSlice = createSlice({
  name: 'auth',
  initialState: {
    user: null,
    isLoading: 'idle',
    error: null,
    isAuth: false,
  },
  reducers: {
    setAuthenticated(state, action) {
      state.user = action.payload.user;
      state.isAuth = true;
    },
    clearAuthenticated(state) {
      state.user = null;
      state.isAuth = false;
    }
  },
  extraReducers: (builder) => {
    builder
      // Login Case
      .addCase(loginUser.pending, (state) => {
        state.isLoading = 'loading';
      })
      .addCase(loginUser.fulfilled, (state, action) => {
        state.isLoading = 'succeeded';
        state.user = action.payload?.user;
        state.isAuth = true;
      })
      .addCase(loginUser.rejected, (state, action) => {
        state.isLoading = 'failed';
        state.error = action.error.message;
      })
      // Register Case
      .addCase(registerUser.pending, (state) => {
        state.isLoading = 'loading';
      })
      .addCase(registerUser.fulfilled, (state, action) => {
        state.isLoading = 'succeeded';
      })
      .addCase(registerUser.rejected, (state, action) => {
        state.isLoading = 'failed';
        state.error = action.error.message;
      })
      // Fetch User Case
      .addCase(fetchData.pending, (state) => {
        state.isLoading = 'loading';
      })
      .addCase(fetchData.fulfilled, (state, action) => {
        state.isLoading = 'succeeded';
        state.user = action.payload?.user;
        state.isAuth = true;
      })
      .addCase(fetchData.rejected, (state, action) => {
        state.isLoading = 'failed';
        state.error = action.error.message;
      })
      .addCase(logoutUser.pending, (state) => {
        state.isLoading = 'loading';
      })
      .addCase(logoutUser.fulfilled, (state, action) => {
        state.isLoading = 'succeeded';
        state.user = null;
        state.isAuth = false;
      })
      .addCase(logoutUser.rejected, (state, action) => {
        state.isLoading = 'failed';
        state.error = action.error.message;
      })
      // Check Auth Status Case
      .addCase(checkAuthStatus.pending, (state) => {
        state.isLoading = 'loading';
      })
      .addCase(checkAuthStatus.fulfilled, (state, action) => {
        state.isLoading = 'succeeded';
        state.user = action.payload?.user;
        state.isAuth = true;
      })
      .addCase(checkAuthStatus.rejected, (state, action) => {
        state.isLoading = 'failed';
        state.error = action.error.message;
      })
  },
});

export const { setAuthenticated, clearAuthenticated } = authSlice.actions;

export default authSlice.reducer;