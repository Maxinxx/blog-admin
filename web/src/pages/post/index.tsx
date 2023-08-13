import { FC } from 'react';
import { message } from 'antd';
import { postArticle, updateArticle } from '@/services/article';
import { history, useParams } from 'umi';
import { ArticleModel } from '@/types/article';
import ArticleEdit from '@/components/article-edit';
import { useUser } from '@/store/user';

const Post: FC = () => {
  const { gid } = useParams<{ gid: string }>();
  const uid = useUser((state) => state.uid);

  const jumpToArticle = () => {
    history.push('/article');
  };

  const handlePost = async (article: ArticleModel) => {
    try {
      await postArticle({
        ...article,
        authorId: uid,
      });
      message.success('创建成功');
      jumpToArticle();
    } catch (e) {
      if (e instanceof Error) {
        message.error(e.message || '创建失败');
      } else {
        message.error('发生未知错误');
      }
    }
  };

  return <ArticleEdit onAction={handlePost}></ArticleEdit>;
};

export default Post;
