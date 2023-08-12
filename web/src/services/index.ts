import { HOST } from '@/constants';
import { request } from '@/utils/request';

export interface UserBasicInfo {
  uid: string;
  name: string;
  avatar?: string;
}
export async function login(username: string, password: string): Promise<UserBasicInfo> {
  const userInfo = await request({
    method: 'post',
    url: 'api/signIn',
    data: {
      name: username,
      password: window.md5(password),
    },
  });

  return userInfo
}

export function register(username: string, password: string) {
  return request({
    method: 'post',
    url: 'api/signUp',
    data: {
      name: username,
      password: window.md5(password),
    },
  });
}
