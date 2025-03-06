import updateTalkTime from '@/libs/api/updateTalkTime';
import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';
const initialState = {
  totalGoldCoin: 0,
  totalTrophy: 0,
  level: 1,
  talkTime: 0,
  isLoading: false,
  isError: false,
  eror: null,
};

export const updateUserStat = createAsyncThunk(
  'updateStat/updateUserStat',
  async ({ talkTime, token }) => {
    try {
      let res;
      if (!talkTime) {
        res = await updateTalkTime({ token, talkTime: null });
      } else {
        res = await await updateTalkTime({ talkTime, token });
      }
      return res.user;
    } catch (error) {
      throw error;
    }
  }
);

const userStatSlice = createSlice({
  name: 'userStat',
  initialState,
  extraReducers: (builder) => {
    builder
      .addCase(updateUserStat.pending, (state) => {
        state.isLoading = true;
        state.isError = false;
        state.error = null;
      })
      .addCase(updateUserStat.fulfilled, (state, action) => {
        state.totalGoldCoin = action.payload.totalGoldCoin;
        state.totalTrophy = action.payload.totalTrophy;
        state.level = action.payload.level;
        state.talkTime = action.payload.talkTime;
        state.isLoading = false;
        state.isError = false;
        state.error = null;
      })
      .addCase(updateUserStat.rejected, (state, action) => {
        state.isLoading = false;
        state.isError = true;
        state.error = action.error?.message;
      });
  },
});

const userStatReducer = userStatSlice.reducer;
export default userStatReducer;
