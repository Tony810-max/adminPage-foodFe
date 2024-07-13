export type dataAuthor = {
  name: string;
  genderValue?: string;
  date: string;
};

export interface ICreateAuthor {
  onSetOpen: (value: boolean) => void;
}

export interface IDialogAuthor {
  idAuthor: number;
}

export interface IEditAuthor {
  idAuthor: number;
  onSetOpen: (value: boolean) => void;
}
