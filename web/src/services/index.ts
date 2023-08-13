import { request } from '@/utils/request';

export interface UserBasicInfo {
  uid: string;
  name: string;
  avatar?: string;
}
export async function login(username: string, password: string): Promise<UserBasicInfo> {
  const userInfo = await request({
    method: 'post',
    url: '/api/signIn',
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
    url: '/api/signUp',
    data: {
      name: username,
      password: window.md5(password),
    },
  });
}

export async function userInfo(): Promise<UserBasicInfo> {
  const fetchRemoteUser = async() => {
    const userInfo = await request({
      method: 'post',
      url: '/api/userInfo',
    });
    localStorage.setItem('userInfo', JSON.stringify(userInfo))
    return userInfo
  }

  const localUserInfo = localStorage.getItem('userInfo')
  if (localUserInfo) {
    try {
      // 异步请求更新用户信息
      fetchRemoteUser()
      return Promise.resolve(JSON.parse(localUserInfo))
    } catch (error) {
      localStorage.setItem('userInfo', '')
    }
  }

  // 如果本地没有用户信息，则同步的请求远端
  return await fetchRemoteUser()
}
