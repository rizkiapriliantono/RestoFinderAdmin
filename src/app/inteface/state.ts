export type FormAction = 'view' | 'update' | 'create' | 'delete';

export interface ComponentData<T = any> extends DialogData<T> {}
export interface DialogData<T = any> {
  formAction?: FormAction;
  data?: T;
  [x: string]: unknown | any;
}
