import { createSlice, PayloadAction } from '@reduxjs/toolkit';

export interface IncrementState {
  selectedIncrementAmount: number | null;
  phoneNumber: string;
  incrementType: string;
  applicantName: string;
  nationalId: string;
  status: 'idle' | 'loading' | 'succeeded' | 'failed';
  error: string | null;
}

const initialState: IncrementState = {
  selectedIncrementAmount: null,
  phoneNumber: '',
  incrementType: '',
  applicantName: '',
  nationalId: '',
  status: 'idle',
  error: null,
};

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
