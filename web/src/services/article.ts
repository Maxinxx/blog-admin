import { ArticleModel } from '@/types/article';
import { request } from '@/utils/request';

export function postArticle(params: {
  title: string,
  content: string,
  tags: string[],
}) {
  return request({
    method: 'post',
    url: '/api/article/create',
    data: params,
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
  gid: string,
) {
  return request({
    method: 'post',
    url: '/api/article/update',
    data: {
      title,
      content,
      tags,
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


export async function  detail(gid: string): Promise<ArticleModel> {
  const res =  await request({
    method: 'post',
    url: '/api/article/detail',
    data: {
      gid,
    }
  });
  return res
}
