import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';
import fetchUserBite from '@/libs/api/fetchUserBite';
import fetchAllBite from '@/libs/api/fetchAllBite';

const initialState = {
  allBites: { posts: [], total: 0, pages: 0 },
  userBites: { posts: [], total: 0, pages: 0 },
  isLoading: true,
  isError: false,
  error: null,
};

export const voiceBiteThunk = createAsyncThunk(
  'bite/voicebite',
  async (userName) => {
    try {
      const [userBites, allBites] = await Promise.all([
        fetchUserBite({ userName, page: 1, limit: 20 }),
        fetchAllBite({ page: 1, limit: 20 }),
      ]);

      return {
        userBites,
        allBites,
      };
    } catch (error) {
      throw error;
    }
  }
);

const voiceBiteSlice = createSlice({
  name: 'bite',
  initialState,
  extraReducers: (builder) => {
    builder
      .addCase(voiceBiteThunk.pending, (state) => {
        state.isLoading = true;
        state.isError = false;
        state.error = null;
        state.allBites = { posts: [], total: 0, pages: 0 };
        state.userBites = { posts: [], total: 0, pages: 0 };
      })
      .addCase(voiceBiteThunk.fulfilled, (state, action) => {
        state.allBites = action.payload.allBites;
        state.userBites = action.payload.userBites;
        state.isLoading = false;
        state.isError = false;
        state.error = null;
      })
      .addCase(voiceBiteThunk.rejected, (state, action) => {
        state.isLoading = false;
        state.isError = true;
        state.error = action.error?.message;
        state.allBites = { posts: [], total: 0, pages: 0 };
        state.userBites = { posts: [], total: 0, pages: 0 };
      });
  },
});

const voiceBiteReducer = voiceBiteSlice.reducer;
export default voiceBiteReducer;
