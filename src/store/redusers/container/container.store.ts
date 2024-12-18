import {
  createSlice,
  PayloadAction,
} from "@reduxjs/toolkit"
import {IContainer, initialState} from "./container.state.ts";

const containerStore = createSlice({
  name: "containerSlice",
  initialState,
  reducers: {
    setContainer(state, action: PayloadAction<IContainer>) {
      state.volume = action.payload.height * action.payload.width * action.payload.depth
      state.name = action.payload.name
      state.height = action.payload.height
      state.width = action.payload.width
      state.depth = action.payload.depth
    },
  }
})

export const {
  setContainer
} = containerStore.actions

export default containerStore.reducer
