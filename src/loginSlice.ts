import { PayloadAction, createSlice } from '@reduxjs/toolkit'
import { RootState } from './store'

export interface LoggedInState{
  email: string
  value: boolean
}

const initialState: LoggedInState = {
  email: "",
  value: false
}

export const loggedInState = createSlice({
  name: 'loggedin',
  initialState,
  reducers: {
    login: (state, action: PayloadAction<string>) => {
      state.value = true;
      state.email = action.payload;
    },
    logout: (state) => {
      state.value = false;
      state.email = "";
    },
  },
})

// Action creators are generated for each case reducer function
export const { login, logout } = loggedInState.actions

//Selector
export const selectValue = (state: RootState) => state.loggedin.value
export const selectEmail = (state: RootState) => state.loggedin.email

//Reducer
export default loggedInState.reducer