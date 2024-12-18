import {
  createSlice,
  PayloadAction,
} from "@reduxjs/toolkit"
import {initialState} from "./popup.state.ts";

const popupStore = createSlice({
  name: "popupSlice",
  initialState,
  reducers: {
    setSelectedContainerState: (state, action: PayloadAction<(boolean)>) => {
      state.selectedContainerState = action.payload;
    },

    setCreateItemState: (state, action: PayloadAction<(boolean)>) => {
      state.createItemState = action.payload;
    },

    setCreateContainerState: (state, action: PayloadAction<(boolean)>) => {
      state.createContainerState = action.payload;
    },

    setCheckReportState: (state, action: PayloadAction<(boolean)>) => {
      state.checkReportState = action.payload;
    },

    setReportViewerState: (state, action: PayloadAction<(boolean)>) => {
      state.reportViewerState = action.payload;
    },

    setReportGeneratorState: (state, action: PayloadAction<(boolean)>) => {
      state.reportGeneratorState = action.payload;
    },

    setContainer3DVisualizerState: (state, action: PayloadAction<(boolean)>) => {
      state.container3DVisualizerState = action.payload;
    },
  }
})

export const {
  setSelectedContainerState,
  setCreateItemState,
  setCreateContainerState,
  setCheckReportState,
  setReportViewerState,
  setReportGeneratorState,
  setContainer3DVisualizerState,

} = popupStore.actions

export default popupStore.reducer
