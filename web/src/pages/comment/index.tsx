import { FC, useEffect, useState } from 'react';
import { Button, Form, Input, InputNumber, message, Select, Table } from 'antd';
import type { ColumnsType } from 'antd/es/table';
import dayjs from 'dayjs';
import 'dayjs/locale/zh-cn';
import { Comment } from '@/types/comment';
import { getComments } from '@/services/comment';
import { Link } from 'umi';

const Comments: FC = () => {
  const [comments, setComments] = useState<Comment[]>([]);
  const [form] = Form.useForm();
  useEffect(() => {
    const getData = async () => {
      const data = await getComments({});
      setComments(data);
    };
    getData();
  }, []);

  const handleSearch = async () => {
    try {
      const params = form.getFieldsValue();
      const res = await getComments(params);
      setComments(res);
    } catch (e) {
      if (e instanceof Error) {
        message.error(e.message || '查询出错');
      }
    }
  };

  const columns: ColumnsType<Comment> = [
    {
      title: '评论 ID',
      dataIndex: '_id',
      key: '_id',
    },
    {
      title: '评论内容',
      dataIndex: 'content',
      key: 'content',
    },
    {
      title: '文章 ID',
      key: 'gid',
      dataIndex: 'gid',
      render: (value: string) => (
        <Link to={`/article/detail/${value}`}>{value}</Link>
      ),
    },
    {
      title: '用户 ID',
      key: 'uid',
      dataIndex: 'uid',
      render: (value: string) => <Link to={`/user?uid=${value}`}>{value}</Link>,
    },
    {
      title: '创建时间',
      dataIndex: 'createdAt',
      key: 'createdAt',
      render: (value: number) => dayjs(value).format('YYYY年MM月DD日 HH:mm:ss'),
    },
    {
      title: '更新时间',
      dataIndex: 'updatedAt',
      key: 'updatedAt',
      render: (value: number) => dayjs(value).format('YYYY年MM月DD日 HH:mm:ss'),
    },
  ];

  return (
    <>
      <Form
        form={form}
        layout="inline"
        style={{
          marginBottom: 20,
        }}
      >
        <Form.Item label="评论内容" name="content">
          <Input style={{ width: 300 }} allowClear />
        </Form.Item>
        <Form.Item label="文章 ID" name="gid">
          <Input style={{ width: 300 }} allowClear />
        </Form.Item>
        <Form.Item label="用户 ID" name="uid">
          <Input style={{ width: 300 }} allowClear />
        </Form.Item>
        <Form.Item>
          <Button type="primary" onClick={handleSearch}>
            查询
          </Button>
        </Form.Item>
      </Form>
      <Table columns={columns} dataSource={comments} rowKey="_id" />
    </>
  );
};

export default Comments;
