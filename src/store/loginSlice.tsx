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
//변수에 저장해뒀다가 사용 -> 페이지를 종료하지 않았을 떄만 작동하게

export const { userLogin, userLoginInit } = login.actions;
export default login;
