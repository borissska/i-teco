import { TTableItem } from "../../../shared/@types/mixed_type";

export interface IElementsTable {
  data: TTableItem[];
  onRowClick: (element: TTableItem) => void;
}