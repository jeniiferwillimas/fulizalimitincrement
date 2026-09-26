import { createAsyncThunk, createSlice, PayloadAction } from '@reduxjs/toolkit';
import { API_URLS } from './urljhelper';

export interface IncrementType {
  id: number;
  name: string;
  description?: string;
  max_amount?: number;
}

export interface IncrementState {
  incrementTypes: IncrementType[];
  selectedIncrementAmount: number | null;
  phoneNumber: string;
  incrementType: string;
  applicantName: string;
  nationalId: string;
  status: 'idle' | 'loading' | 'succeeded' | 'failed';
  error: string | null;
}

const initialState: IncrementState = {
  incrementTypes: [],
  selectedIncrementAmount: null,
  phoneNumber: '',
  incrementType: '',
  applicantName: '',
  nationalId: '',
  status: 'idle',
  error: null,
};

export const fetchIncrementTypes = createAsyncThunk('increment/fetchIncrementTypes', async () => {
  const response = await fetch(API_URLS.incrementTypes);
  if (!response.ok) {
    throw new Error('Failed to load increment types');
  }
  const result = (await response.json()) as { success: boolean; data: IncrementType[] };
  return result.data;
});

const incrementSlice = createSlice({
  name: 'increment',
  initialState,
  reducers: {
    setSelectedIncrementAmount(state, action: PayloadAction<number | null>) {
      state.selectedIncrementAmount = action.payload;
    },
    setPhoneNumber(state, action: PayloadAction<string>) {
      state.phoneNumber = action.payload;
    },
    setIncrementType(state, action: PayloadAction<string>) {
      state.incrementType = action.payload;
    },
    setApplicantName(state, action: PayloadAction<string>) {
      state.applicantName = action.payload;
    },
    setNationalId(state, action: PayloadAction<string>) {
      state.nationalId = action.payload;
    },
    resetIncrementForm(state) {
      state.selectedIncrementAmount = null;
      state.phoneNumber = '';
      state.incrementType = '';
      state.applicantName = '';
      state.nationalId = '';
      state.status = 'idle';
      state.error = null;
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(fetchIncrementTypes.pending, (state) => {
        state.status = 'loading';
        state.error = null;
      })
      .addCase(fetchIncrementTypes.fulfilled, (state, action) => {
        state.status = 'succeeded';
        state.incrementTypes = action.payload;
      })
      .addCase(fetchIncrementTypes.rejected, (state, action) => {
        state.status = 'failed';
        state.error = action.error.message ?? 'Unable to fetch increment types';
      });
  },
});

export const {
  setSelectedIncrementAmount,
  setPhoneNumber,
  setIncrementType,
  setApplicantName,
  setNationalId,
  resetIncrementForm,
} = incrementSlice.actions;

export default incrementSlice.reducer;
