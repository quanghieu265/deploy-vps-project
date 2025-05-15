import { createSlice } from '@reduxjs/toolkit';
import type { PayloadAction } from '@reduxjs/toolkit';

export interface AuthState {
  userInfo: {
    isAuthenticated?: boolean;
  };
}

const getAuthenticated = () => {
  const userInfo = localStorage.getItem('userInfo');
  return userInfo ? JSON.parse(userInfo) : false;
};

const initialState: AuthState = {
  userInfo: getAuthenticated(),
};

export const authSlice = createSlice({
  name: 'auth',
  initialState,
  reducers: {
    setAuthenticate: (state, action: PayloadAction<{ isAuthenticated: boolean }>) => {
      localStorage.setItem('userInfo', JSON.stringify(action.payload));
      state.userInfo = action.payload;
    },
  },
});

// Action creators are generated for each case reducer function
export const { setAuthenticate } = authSlice.actions;

export default authSlice.reducer;
