import { FC, useEffect } from 'react';
import { useState } from 'react';
import { Input, Button, Modal, Select, Spin, Divider } from 'antd';
import { detail } from '@/services/article';
import TextArea from 'antd/es/input/TextArea';
import ReactMarkdown from 'react-markdown';
import { ArticleModel } from '@/types/article';
import './index.less';
import { OptionProps } from 'antd/es/select';

export interface ArticleEditProps {
  // 指定 gid 时为编辑，否则为创建
  gid?: string;
  onAction: (value: Omit<ArticleModel, '_id'>) => void;
}

const defaultTags = [
  { value: '随笔', label: '随笔' },
  { value: '日记', label: '日记' },
  { value: '宠物', label: '宠物' },
];

const ArticleEdit: FC<ArticleEditProps> = (props) => {
  const { gid, onAction } = props;
  const [open, setOpen] = useState(false);
  const [fetching, setFetching] = useState(true);
  const [article, setArticle] = useState<Omit<ArticleModel, '_id'>>({
    title: '',
    content: '',
    tags: [],
  });

  useEffect(() => {
    if (gid) {
      const getData = async () => {
        const data = await detail(gid);
        setArticle(data);
      };
      getData().finally(() => {
        setFetching(false);
      });
    } else {
      setFetching(false);
    }
  }, [gid]);

  const handlePost = () => {
    if (!article) {
      return;
    }
    onAction(article);
  };

  if (fetching) {
    return <Spin></Spin>;
  }

  return (
    <div className="article-edit-container">
      <div className="edit">
        <div className="title-post">
          <Input
            className="title"
            value={article?.title}
            placeholder="请输入文章标题"
            onChange={(e) =>
              setArticle({
                ...article,
                title: e.target.value,
              })
            }
          />
          <Button
            type="primary"
            block
            className="post-button"
            onClick={() => setOpen(true)}
          >
            发布
          </Button>
        </div>

        <TextArea
          className="input-bottom-margin"
          rows={25}
          placeholder="请输入文章内容"
          value={article?.content}
          onChange={(e) =>
            setArticle({
              ...article,
              content: e.target.value,
            })
          }
        />
      </div>
      <div className="preview">
        <h1 className="title-style">{article?.title}</h1>
        <ReactMarkdown children={article?.content || ''} />
      </div>

      <Modal
        title="请为文章添加标签"
        open={open}
        onOk={handlePost}
        onCancel={() => setOpen(false)}
        destroyOnClose={true}
        okText="发文"
        cancelText="取消"
      >
        <Select
          mode="tags"
          style={{ width: '100%' }}
          value={article?.tags}
          options={defaultTags}
          onChange={(value) =>
            setArticle({
              ...article,
              tags: value,
            })
          }
          tokenSeparators={[',']}
          placeholder={'可直接输入标签'}
        />
      </Modal>
    </div>
  );
};

export default ArticleEdit;
