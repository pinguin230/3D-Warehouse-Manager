export interface IItem {
  _id?: string;
  name: string;
  weight: number;
  height: number;
  width: number;
  depth: number;
  volume?: number;
  quantity: number;
  x?: number;
  y?: number;
  z?: number;
  rotated?: boolean;
}

export const initialState: IItem[] = []