import { FC, useEffect } from 'react';
import { useState } from 'react';
import { Input, Button, Modal, Select, message, Row, Col, Spin } from 'antd';
import { detail, updateArticle } from '@/services/article';
import TextArea from 'antd/es/input/TextArea';
import { useHistory, useParams } from 'umi';
import ReactMarkdown from 'react-markdown';
import { ArticleModel } from '@/types/article';
import './edit.less';

const Edit: FC = () => {
  const history = useHistory();
  const [open, setOpen] = useState(false);
  const [confirmLoading, setConfirmLoading] = useState(false);
  const [article, setArticle] = useState<ArticleModel>();
  const { gid } = useParams<{ gid: string }>();

  useEffect(() => {
    const getData = async () => {
      const data = await detail(gid);
      setArticle(data);
    };
    getData();
  }, [gid]);

  const jumpToArticle = () => {
    history.push('/article');
  };

  const handlePost = async () => {
    if (!article) {
      return;
    }
    setConfirmLoading(true);
    try {
      await updateArticle(
        article.title,
        article.content,
        article.tags,
        Date.now(),
        gid,
      );
      message.success('更新成功！');
      setOpen(false);
      setConfirmLoading(false);
      jumpToArticle();
    } catch (e: any) {
      message.error(e?.msg || '更新失败');
      setConfirmLoading(false);
    }
  };
  console.log('🚀 ~ file: edit.tsx:54 ~ article:', article);

  if (!article) {
    return <Spin></Spin>;
  }

  return (
    <>
      <Row gutter={[16, 8]}>
        <Col span={12}>
          <Input
            className="input-bottom-margin"
            value={article.title}
            onChange={(e) =>
              setArticle({
                ...article,
                title: e.target.value,
              })
            }
          />

          <TextArea
            className="input-bottom-margin"
            rows={25}
            value={article.content}
            onChange={(e) =>
              setArticle({
                ...article,
                content: e.target.value,
              })
            }
          />
        </Col>
        <Col span={12}>
          <h1 className="title-style">{article.title}</h1>
          <ReactMarkdown children={article.content} />
        </Col>
      </Row>

      <div className="center-container">
        <Button
          type="primary"
          block
          className="edit-button"
          onClick={() => setOpen(true)}
        >
          下一步
        </Button>
      </div>

      <Modal
        title="请为文章添加标签"
        open={open}
        onOk={handlePost}
        confirmLoading={confirmLoading}
        onCancel={() => setOpen(false)}
        destroyOnClose={true}
        okText="发文"
        cancelText="取消"
      >
        <Select
          mode="tags"
          style={{ width: '100%' }}
          value={article.tags}
          onChange={(value) =>
            setArticle({
              ...article,
              tags: value,
            })
          }
          tokenSeparators={[',']}
          placeholder={'请输入标签'}
        />
      </Modal>
    </>
  );
};

export default Edit;
