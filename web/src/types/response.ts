export interface Response<T = any> {
  msg: string;
  status: number;
  data: T;
}
