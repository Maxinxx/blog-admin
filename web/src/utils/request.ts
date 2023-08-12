import axios, { AxiosRequestConfig } from 'axios';
import { Response } from '@/types/response';

/**
 * 统一的请求函数
 */
export function request(config: AxiosRequestConfig): Promise<any> {
  const { headers, ...rest } = config;
  return axios({
    ...rest,
    headers: {
      ...headers,
      'Content-Type': 'application/json',
    },
  })
    .then((res) => res.data)
    .then((res) => {
      const { status, msg, data } = res as Response;
      if (status !== 0) {
        throw new Error(msg);
      }
      return data;
    });
}
