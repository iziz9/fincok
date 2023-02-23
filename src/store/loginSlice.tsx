import { createSlice } from '@reduxjs/toolkit';
import type { PayloadAction } from '@reduxjs/toolkit';

interface UserLoginState {
  formData: FormData;
}

const initialForm = new FormData();
initialForm.append('memberId', '');
initialForm.append('password', '');

const initialState: UserLoginState = {
  formData: initialForm,
};

let login = createSlice({
  name: 'user',
  initialState,
  reducers: {
    userLogin(state, action: PayloadAction<string | any>) {
      state.formData = action.payload.formData;
    },
    userLoginInit(state) {
      state.formData = initialForm;
    },
  },
});

//dispatch로 slice 내부 메소드 접근

export const { userLogin, userLoginInit } = login.actions;
export default login;
