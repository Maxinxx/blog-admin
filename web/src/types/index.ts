export interface ApiResponse<T = any> {
  msg: string;
  status: number;
  data: T;
}
