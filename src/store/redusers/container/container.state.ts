import {IItem} from "../item/item.state.ts";

export interface IContainer {
  _id?: string;
  name: string,
  volume?: number,
  width: number,
  height: number,
  depth: number,
  x?: number,
  y?: number,
  z?: number,
  contents?: IItem[],
  usedVolume?: number;
  usedWeight?: number;
}

export const initialState: IContainer = {
  _id: undefined,
  volume: undefined,
  name: undefined,
  width: undefined,
  height: undefined,
  depth: undefined,
  x: 0,
  y: 0,
  z: 0,
  contents: []
}