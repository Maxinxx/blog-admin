import { User } from '@/types/user';
import { request } from '@/utils/request';

export async function getUsers(
  params: Partial<Pick<User, 'name' | 'age' | 'gender'>>,
): Promise<User[]> {
  const { name, age, gender } = params;
  const list = await request({
    method: 'post',
    url: '/api/user/search',
    data: {
      name,
      age,
      gender,
    },
  });
  return list;
}
