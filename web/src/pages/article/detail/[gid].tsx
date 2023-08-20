import { detail } from '@/services/article';
import { FC, useEffect, useState } from 'react';
import { useParams } from 'umi';
import ReactMarkdown from 'react-markdown';
import './index.less';
import { ArticleModel } from '@/types/article';
import { Comment } from '@/types/comment';
import { Divider, Empty, Spin, Input, Button, Avatar, message } from 'antd';
import { createComment, getComments } from '@/services/comment';
import { User } from '@/types/user';
import { getUserDetail } from '@/services/user';
import dayjs from 'dayjs';

interface CommentItemProps {
  content: string;
  uid: string;
  createTime: number;
}
const CommentItem: FC<CommentItemProps> = ({ content, uid, createTime }) => {
  const [userInfo, setUserInfo] = useState<User>();

  useEffect(() => {
    getUserDetail(uid).then((res) => {
      setUserInfo(res);
    });
  }, [uid]);

  return (
    <li className="comment-item">
      <Avatar
        style={{
          backgroundColor: '#87d068',
        }}
      >
        {userInfo?.avatar ? (
          <img src={userInfo.avatar} alt="头像" />
        ) : (
          userInfo?.name
        )}
      </Avatar>
      <span className="content">{content}</span>
      <span className="create-time">
        {dayjs(createTime).format('MM月DD日 HH:mm:ss')}
      </span>
    </li>
  );
};

const Detail: FC = () => {
  const [article, setArticle] = useState<ArticleModel>();
  const [comments, setComments] = useState<Comment[]>([]);
  const [commentContent, setCommentContent] = useState<string>('');
  const { gid } = useParams<{ gid: string }>();

  const queryComments = async (gid: string) => {
    const data = await getComments({ gid });
    setComments(data);
  };

  const handlePublishComment = async () => {
    try {
      await createComment({
        content: commentContent,
        gid,
      });
      queryComments(gid);
      setCommentContent('');
      message.success('评论成功');
    } catch (error) {
      message.error('评论失败');
    }
  };
  useEffect(() => {
    const getData = async () => {
      const data = await detail(gid);
      setArticle(data);
    };
    getData();
    queryComments(gid);
  }, [gid]);

  if (!article) {
    return <Spin></Spin>;
  }

  return (
    <div className="article-detail">
      <h1 className="title">{article.title}</h1>
      <p className="content">
        <ReactMarkdown>{article.content}</ReactMarkdown>
      </p>
      <Divider />
      <div className="create-comment">
        <Input.TextArea
          value={commentContent}
          onChange={(e) => setCommentContent(e.target.value)}
          placeholder="发表一下看法吧"
        />
        <div className="toolbar">
          <Button type="primary" onClick={handlePublishComment}>
            发表评论
          </Button>
        </div>
      </div>
      {comments.length > 0 ? (
        <ul className="comment-list">
          {comments.map((item) => (
            <CommentItem
              key={item._id}
              content={item.content}
              uid={item.uid}
              createTime={item.createdAt}
            />
          ))}
        </ul>
      ) : (
        <Empty description="暂无评论" />
      )}
    </div>
  );
};

export default Detail;
