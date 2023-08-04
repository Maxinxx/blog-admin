import { FC } from 'react';
import { useState } from 'react';
import { Input, Button, Modal, Select, message } from 'antd';
import './index.less';
import { postArticle } from '@/services/article';
import TextArea from 'antd/es/input/TextArea';
import { useHistory } from 'umi';

let title = '';
let content = '';
let tags: string[] = [];

const Post: FC = () => {
  const history = useHistory();
  const [open, setOpen] = useState(false);
  const [confirmLoading, setConfirmLoading] = useState(false);

  const jumpToArticle = () => {
    history.push('/article');
  };
  const handlePost = async () => {
    setConfirmLoading(true);
    try {
      await postArticle(title, content, tags, Date.now());
      message.success('发文成功！');
      setOpen(false);
      setConfirmLoading(false);
      jumpToArticle();
    } catch (e: any) {
      message.error(e?.msg || '发文失败');
      setConfirmLoading(false);
    }
  };

  return (
    <>
      <Input
        className="input-bottom-margin"
        placeholder="title..."
        bordered={true}
        allowClear={true}
        onChange={(e) => {
          title = e.target.value;
        }}
      />

      <TextArea
        className="input-bottom-margin"
        rows={25}
        placeholder="content..."
        bordered={true}
        allowClear={true}
        onChange={(e) => (content = e.target.value)}
      />

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
          onChange={(value) => (tags = value)}
          tokenSeparators={[',']}
          placeholder={'请输入标签'}
        />
      </Modal>
    </>
  );
};

export default Post;
