import { FC, useEffect, useState } from 'react';
import {
  Button,
  Form,
  Input,
  message,
  Popconfirm,
  Select,
  Space,
  Table,
  Tag,
} from 'antd';
import type { ColumnsType } from 'antd/es/table';
import { deleteArticleBy, getArticles } from '@/services/article';
import dayjs from 'dayjs';
import { Link } from 'umi';
import 'dayjs/locale/zh-cn';
import { ArticleModel } from '@/types/article';

const Article: FC = () => {
  const [articleData, setArticleData] = useState<ArticleModel[]>([]);
  const [form] = Form.useForm();
  useEffect(() => {
    const getData = async () => {
      const articles = await getArticles({});
      setArticleData(articles);
    };
    getData();
  }, []);

  const deleteArticle = async (gid: string) => {
    try {
      await deleteArticleBy(gid);
      message.success('删除成功');
      handleSearch();
    } catch (e) {
      if (e instanceof Error) {
        message.error(e.message || '删除失败');
      }
    }
  };

  const handleSearch = async () => {
    try {
      const params = form.getFieldsValue();
      const res = await getArticles(params);
      setArticleData(res);
    } catch (e) {
      if (e instanceof Error) {
        message.error(e.message || '查询出错');
      }
    }
  };

  const columns: ColumnsType<ArticleModel> = [
    {
      title: '文章ID',
      dataIndex: '_id',
      key: '_id',
    },
    {
      title: '标题',
      dataIndex: 'title',
      key: 'title',
      render: (_, record) => {
        return <Link to={`/article/detail/${record._id}`}>{record.title}</Link>;
      },
    },
    {
      title: '标签',
      key: 'keywords',
      dataIndex: 'keywords',
      render: (_, { tags }) => (
        <>
          {tags?.map((tag) => {
            let color;
            switch (tag.length % 3) {
              case 0: {
                color = 'geekblue';
                break;
              }
              case 1: {
                color = 'green';
                break;
              }
              case 2: {
                color = 'volcano';
                break;
              }
            }
            return (
              <Tag color={color} key={tag}>
                {tag.toUpperCase()}
              </Tag>
            );
          })}
        </>
      ),
    },
    {
      title: '发表时间',
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
    {
      title: '操作',
      key: 'action',
      render: (_, record) => (
        <Space size="middle">
          <Link to={`/article/edit/${record._id}`} className="link-style">
            编辑
          </Link>

          <Popconfirm
            title="删除此篇文章"
            description="此篇文章将被彻底删除，是否删除？"
            onConfirm={() => deleteArticle(record._id)}
            okText="删除"
            cancelText="再想想"
          >
            <Button type="link" size="small" className="link-style">
              删除
            </Button>
          </Popconfirm>
        </Space>
      ),
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
        <Form.Item label="文章 ID" name="_id">
          <Select
            style={{ width: 300 }}
            mode="tags"
            tokenSeparators={[',']}
            allowClear
          />
        </Form.Item>
        <Form.Item label="标题" name="title">
          <Input style={{ width: 300 }} allowClear />
        </Form.Item>
        <Form.Item label="标签" name="tags">
          <Select
            style={{ width: 300 }}
            mode="tags"
            tokenSeparators={[',']}
            allowClear
          />
        </Form.Item>
        <Form.Item>
          <Button type="primary" onClick={handleSearch}>
            查询
          </Button>
        </Form.Item>
      </Form>
      <Table columns={columns} dataSource={articleData} rowKey="_id" />
    </>
  );
};

export default Article;
