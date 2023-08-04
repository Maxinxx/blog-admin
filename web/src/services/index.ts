import { HOST } from '@/constants';
import { request } from '@/utils/request';

export function login(username: string, password: string) {
  return request({
    method: 'post',
    url: `${HOST}/signIn`,
    data: {
      name: username,
      password: password,
    },
  });
}

export function register(username: string, password: string) {
  return request({
    method: 'post',
    url: `${HOST}/signUp`,
    data: {
      name: username,
      password: password,
    },
  });
}
