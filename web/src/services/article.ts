import { HOST } from '@/constants';
import { request } from '@/utils/request';

export function postArticle(
  title: string,
  content: string,
  tags: string[],
  createTime: number,
) {
  return request({
    method: 'post',
    url: `${HOST}/article`,
    data: {
      title,
      content,
      tags,
      createTime,
      authorName: 'maxin',
    },
  });
}

export function searchArticles(searchMap: Map<string, string[]>) {
  const requestBody: any = {};
  searchMap.forEach((value, key) => {
    requestBody[key] = value;
  });
  return request({
    method: 'post',
    url: `${HOST}/article/search`,
    data: requestBody,
  });
}

export function deleteArticleBy(gid: string) {
  return request({
    method: 'post',
    url: `${HOST}/article/delete`,
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
    url: `${HOST}/article/update`,
    data: {
      title,
      content,
      tags,
      updateTime,
      gid,
    },
  });
}

export function getAllArticles() {
  return request({
    method: 'get',
    url: `${HOST}/article`,
    params: {
      authorName: 'maxin',
    },
  });
}

export function getSomeArticles(params: any) {
  return request({
    method: 'get',
    url: `${HOST}/article`,
    params: {
      ...params,
    },
  });
}
