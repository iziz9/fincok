import { createSlice } from '@reduxjs/toolkit';
import type { PayloadAction } from '@reduxjs/toolkit';

interface UserInfoState {
  memberId: string | any;
  name: string | any;
  birth: string | any;
  category: string | any;
  bank: string | any;
}

const initialState: UserInfoState = {
  memberId: '',
  name: '',
  birth: '',
  category: '',
  bank: '',
};

let user = createSlice({
  name: 'user',
  initialState,
  reducers: {
    userInfo(state, action: PayloadAction<string | any>) {
      state.memberId = action.payload.memberId;
      state.name = action.payload.name;
      state.birth = action.payload.birth;
      state.category = action.payload.category;
      state.bank = action.payload.bank;
    },
    userInit(state) {
      state.memberId = '';
      state.name = '';
      state.birth = '';
      state.category = '';
      state.bank = '';
    },
  },
});

export const { userInfo, userInit } = user.actions;
export default user;
