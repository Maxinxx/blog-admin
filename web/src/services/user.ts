import { User } from '@/types/user';
import { request } from '@/utils/request';

export async function getUsers(
  params: Partial<Pick<User, 'uid' | 'name' | 'age' | 'gender'>>,
): Promise<User[]> {
  const list = await request({
    method: 'post',
    url: '/api/user/search',
    data: params,
  });
  return list;
}

export async function getUserDetail(uid: string): Promise<User> {
  const res = await request({
    method: 'post',
    url: '/api/user/detail',
    data: {
      uid,
    },
  });
  return res;
}
