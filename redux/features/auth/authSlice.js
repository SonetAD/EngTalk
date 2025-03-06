import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';
import userLogin from '@/libs/api/userLogin';
const initialState = {
  user: {
    token: '',
    userInfo: {},
  },
  isLoading: false,
  isError: false,
  error: null,
};

export const loginUser = createAsyncThunk(
  'auth/loginUser',
  async ({ userName, password }) => {
    try {
      const res = await userLogin({ userName, password });
      return res;
    } catch (error) {
      throw error;
    }
  }
);

const authSlice = createSlice({
  name: 'auth',
  initialState,
  extraReducers: (builder) => {
    builder
      .addCase(loginUser.pending, (state) => {
        state.isLoading = true;
        state.isError = false;
        state.error = null;
        state.user = {
          token: '',
          userInfo: {},
        };
      })
      .addCase(loginUser.fulfilled, (state, action) => {
        state.user = {
          token: action.payload.token,
          userInfo: action.payload.user,
        };
        state.isLoading = false;
        state.isError = false;
        state.error = null;
      })
      .addCase(loginUser.rejected, (state, action) => {
        state.isLoading = false;
        state.isError = true;
        state.error = action.error?.message;
        state.user = {
          token: '',
          userInfo: {},
        };
      });
  },
});

const authReducer = authSlice.reducer;
export default authReducer;
