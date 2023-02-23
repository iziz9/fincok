import { createSlice } from '@reduxjs/toolkit';
import type { PayloadAction } from '@reduxjs/toolkit';

interface UserLoginState {
  memberId: string | any;
  password: string | any;
}

const initialState: UserLoginState = {
  memberId: '',
  password: '',
};

let login = createSlice({
  name: 'user',
  initialState,
  reducers: {
    userLogin(state, action: PayloadAction<string | any>) {
      state.memberId = action.payload.memberId;
      state.password = action.payload.password;
    },
    userLoginInit(state) {
      state.memberId = '';
      state.password = '';
    },
  },
});

export const { userLogin, userLoginInit } = login.actions;
export default login;
