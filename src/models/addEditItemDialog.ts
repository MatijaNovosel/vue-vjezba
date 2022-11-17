import { Item } from './Item';

export interface addEditItemDialog {
  showDialog: boolean,
  isEditMode: boolean,
  item: Item | undefined
}