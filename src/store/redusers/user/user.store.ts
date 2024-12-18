import {
  createAsyncThunk,
  createSlice,
  current,
  PayloadAction,
} from "@reduxjs/toolkit"
import { Axios } from "axios"
import {initialState, ProfileT} from "./user.state.ts";
import {RootState} from "../../store.ts";

export const fetchProfile = createAsyncThunk(
    "profile/fetProfile",
    async (axios: Axios) => (await axios.get("api/account")).data
)

const userStore = createSlice({
  name: "userSlice",
  initialState,
  reducers: {
    setUser: (state, action: PayloadAction<{ uid: string, name: string, email: string }>) => {
      state.uid = action.payload.uid;
      state.name = action.payload.name;
      state.email = action.payload.email;
      localStorage.setItem('uid', action.payload.uid); // Збереження у localStorage
    },
    clearUser: (state) => {
      state.uid = null;
      state.name = null;
      state.email = null;
      localStorage.removeItem('uid'); // Очищення localStorage
      localStorage.removeItem('idToken'); // Очищення idToken з localStorage
    }
  }
})

export const {
  setUser,
  clearUser
} = userStore.actions

export default userStore.reducer
