import { ArticleModel } from '@/types/article';
import { request } from '@/utils/request';

export function postArticle(
  title: string,
  content: string,
  tags: string[],
  createTime: number,
) {
  return request({
    method: 'post',
    url: '/api/article/create',
    data: {
      title,
      content,
      tags,
      createTime,
      authorName: 'maxin',
    },
  });
}

export function deleteArticleBy(gid: string) {
  return request({
    method: 'post',
    url: '/api/article/delete',
    data: {
      gid,
    },
  });
}

export function updateArticle(
  title: string,
  content: string,
  tags: string[],
  updateTime: number,
  gid: string,
) {
  return request({
    method: 'post',
    url: '/api/article/update',
    data: {
      title,
      content,
      tags,
      updateTime,
      gid,
    },
  });
}

export async function  getArticles(params: Partial<Pick<ArticleModel, '_id' | 'tags' | 'title'>>): Promise<ArticleModel[]> {
  const { _id, tags, title } = params;
  const list =  await request({
    method: 'post',
    url: '/api/article/search',
    data: {
      _id,
      tags,
      title,
    }
  });
  return list
}
