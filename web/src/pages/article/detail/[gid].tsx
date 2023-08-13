import { detail, getArticles } from '@/services/article';
import { FC, useEffect, useState } from 'react';
import { useParams } from 'umi';
import ReactMarkdown from 'react-markdown';
import './index.less';
import { ArticleModel } from '@/types/article';
import { Spin } from 'antd';

const Detail: FC = () => {
  const [article, setArticle] = useState<ArticleModel>();
  const { gid } = useParams<{ gid: string }>();

  useEffect(() => {
    const getData = async () => {
      const data = await detail(gid);
      setArticle(data);
    };
    getData();
  }, [gid]);

  if (!article) {
    return <Spin></Spin>;
  }

  return (
    <>
      <h1 className="title-style">{article.title}</h1>
      <p>
        <ReactMarkdown>{article.content}</ReactMarkdown>
      </p>
    </>
  );
};

export default Detail;
