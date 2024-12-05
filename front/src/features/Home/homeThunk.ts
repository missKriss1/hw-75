import { createAsyncThunk } from '@reduxjs/toolkit';
import axiosApi from '../../axiosApi';
import { IMessage } from '../../types';

export const encodeFetch = createAsyncThunk('home/encodeFetch', async (message: IMessage) => {
  const { data } = await axiosApi.post('/encode', message);
  return data;
});

export const decodeFetch = createAsyncThunk('home/decodeFetch', async (message: IMessage) => {
  const { data } = await axiosApi.post('/decode', message);
  return data;
});