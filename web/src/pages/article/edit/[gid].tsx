import { FC } from 'react';
import { message } from 'antd';
import { updateArticle } from '@/services/article';
import { history, useParams } from 'umi';
import { ArticleModel } from '@/types/article';
import ArticleEdit from '@/components/article-edit';

const Edit: FC = () => {
  const { gid } = useParams<{ gid: string }>();

  const jumpToArticle = () => {
    history.push('/article');
  };

  const handleUpdate = async (article: ArticleModel) => {
    try {
      await updateArticle(article.title, article.content, article.tags, gid);
      message.success('更新成功！');
      jumpToArticle();
    } catch (e: any) {
      message.error(e?.msg || '更新失败');
    }
  };

  return <ArticleEdit gid={gid} onAction={handleUpdate}></ArticleEdit>;
};

export default Edit;
