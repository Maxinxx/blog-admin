import { HOST } from '@/constants';
import { request } from '@/utils/request';

export function login(username: string, password: string) {
  return request({
    method: 'post',
    url: 'api/signIn',
    data: {
      name: username,
      password: window.md5(password),
    },
  });
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
