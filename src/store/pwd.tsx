import { createSlice } from '@reduxjs/toolkit';

interface UserInfoState {
  userPassword: boolean;
}

const initialState: UserInfoState = {
  userPassword: false,
};

let password = createSlice({
  name: 'password',
  initialState,
  reducers: {
    setPassword(state,action) {
      state.userPassword = action.payload
    },
    getPassword(state) {
      state.userPassword;
    },
  },
});

export let { setPassword, getPassword } = password.actions;
export default password;
