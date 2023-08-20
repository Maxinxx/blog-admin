import { Comment } from '@/types/comment';
import { request } from '@/utils/request';

export async function getComments(
  params: Partial<Pick<Comment, 'gid' | 'uid' | 'content'>>,
): Promise<Comment[]> {
  const list = await request({
    method: 'post',
    url: '/api/comment/search',
    data: params,
  });
  return list;
}

export async function createComment(
  params: Omit<Comment, '_id'>,
): Promise<void> {
  const list = await request({
    method: 'post',
    url: '/api/comment/create',
    data: params,
  });
  return list;
}

export async function deleteComment(id: string): Promise<void> {
  const list = await request({
    method: 'post',
    url: '/api/comment/delete',
    data: { id },
  });
  return list;
}
