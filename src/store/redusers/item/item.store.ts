import {
  createSlice,
  PayloadAction,
} from "@reduxjs/toolkit"
import {IItem, initialState} from "./item.state.ts";

const itemStore = createSlice({
  name: "itemSlice",
  initialState,
  reducers: {
    setItems(state, action: PayloadAction<IItem[]>) {
      state.push(...action.payload);
    },
  }
})

export const {
  setItems
} = itemStore.actions

export default itemStore.reducer
