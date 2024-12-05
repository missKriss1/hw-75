import { createSlice } from '@reduxjs/toolkit';
import { encodeFetch, decodeFetch } from './homeThunk';
import { RootState } from '../../app/store';

interface IHomeState {
  encoded: string ;
  decoded: string;
  fetchLoad: boolean;
}

const initialState: IHomeState = {
  fetchLoad: false,
  encoded: '',
  decoded: '',
};

export const selectEncode = (state: RootState) => state.home.encoded;
export const selectDecode = (state: RootState) => state.home.decoded;

const homeSlice = createSlice({
  name: 'home',
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(encodeFetch.pending, (state) => {
        state.fetchLoad = true;
      })
      .addCase(encodeFetch.fulfilled, (state, action) => {
        state.fetchLoad = false;
        state.encoded = action.payload.message;
      })
      .addCase(encodeFetch.rejected, (state) => {
        state.fetchLoad = false;
      })
      .addCase(decodeFetch.pending, (state) => {
        state.fetchLoad = true;
      })
      .addCase(decodeFetch.fulfilled, (state, action) => {
        state.fetchLoad = false;
        state.decoded = action.payload.message;
      })
      .addCase(decodeFetch.rejected, (state) => {
        state.fetchLoad = false;
      });
  },
});

export const homeReducer = homeSlice.reducer;
