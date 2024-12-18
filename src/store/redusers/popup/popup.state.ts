
export type PopupT = {
  selectedContainerState: boolean;
  createItemState: boolean;
  createContainerState: boolean;
  checkReportState: boolean;
  reportViewerState: boolean;
  reportGeneratorState: boolean;
  container3DVisualizerState: boolean;
}

export const initialState: PopupT = {
  selectedContainerState: false,
  createItemState: false,
  createContainerState: false,
  checkReportState: false,
  reportViewerState: false,
  reportGeneratorState: false,
  container3DVisualizerState: false,
}
