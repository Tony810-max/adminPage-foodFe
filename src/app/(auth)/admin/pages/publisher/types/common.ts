export interface ICreate {
  onSetOpen: (value: boolean) => void;
}

export type IFormValue = {
  name: string;
  description: string;
};

export interface IEditDialog {
  name: string;
  value: string;
  onsetOpen: (value: boolean) => void;
  idPublisher: number;
}

export interface IUpdate {
  name: string;
  value: string;
  idPublisher: number;
}
