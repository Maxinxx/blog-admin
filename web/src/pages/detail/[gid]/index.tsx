import { getSomeArticles } from '@/services/article';
import { FC, useEffect, useState } from 'react';
import { useParams } from 'umi';
import ReactMarkdown from 'react-markdown';
import './index.less';

const Detail: FC = () => {
  const [article, setArticle] = useState({} as ArticleModel);
  const { gid } = useParams<{ gid: string }>();

  useEffect(() => {
    const getData = async () => {
      const data = await getSomeArticles({
        gid: gid,
      });
      const article: ArticleModel = data.article[0];
      setArticle(article);
    };
    getData();
  }, []);
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
