import { FC, useEffect, useState } from 'react';
import { Button, message, Popconfirm, Space, Table, Tag } from 'antd';
import type { ColumnsType } from 'antd/es/table';
import { MenuArticle } from '@/models/menu-model/menu';
import SearchContainer from '@/components/search';
import {
  FilterGroupId,
  FilterKeyword,
  FilterTitle,
} from '@/models/filter-model/filter';
import {
  deleteArticleBy,
  getAllArticles,
  searchArticles,
} from '@/services/article';
import dayjs from 'dayjs';
import { Link } from 'umi';
import relativeTime from 'dayjs/plugin/relativeTime';
import 'dayjs/locale/zh-cn';
import ReactMarkdown from 'react-markdown';

const Article: FC = () => {
  const [articleData, setArticleData] = useState([] as ArticleModel[]);
  dayjs.extend(relativeTime);
  dayjs.locale('zh-cn');

  useEffect(() => {
    const getData = async () => {
      const data = await getAllArticles();
      const articles: ArticleModel[] = data.article;
      const dataSource = articles
        .sort((a, b) => b.createTime - a.createTime)
        .map((item, index) => {
          return {
            key: index + 1,
            createDisplayTime: dayjs(item.createTime).format(
              'YYYY年MM月DD日 HH:mm:ss',
            ),
            updateDisplayTime: dayjs(item.updateTime).fromNow(),
            ...item,
          };
        });
      setArticleData(dataSource);
    };
    getData();
  }, []);

  const deleteArticle = async (gid: string) => {
    try {
      await deleteArticleBy(gid);
      message.success('删除成功');
      window.location.reload();
    } catch (e: any) {
      message.error(e?.msg || '删除失败');
    }
  };

  const handleSearch = async (map: Map<string, string[]>) => {
    try {
      const res = await searchArticles(map);
      debugger;
      setArticleData(res);
    } catch (e: any) {}
  };

  const columns: ColumnsType<ArticleModel> = [
    {
      title: '标题',
      dataIndex: 'title',
      key: 'title',
      render: (text, record) => (
        <Link to={`/detail/${record._id}/`} className="link-style">
          <ReactMarkdown skipHtml={true}>{text}</ReactMarkdown>
        </Link>
      ),
    },
    {
      title: '文章ID',
      dataIndex: '_id',
      key: '_id',
    },
    {
      title: '标签',
      key: 'keywords',
      dataIndex: 'keywords',
      render: (_, { tags }) => (
        <>
          {tags.map((tag) => {
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
      dataIndex: 'createDisplayTime',
      key: 'createDisplayTime',
    },
    {
      title: '更新时间',
      dataIndex: 'updateDisplayTime',
      key: 'updateDisplayTime',
    },
    {
      title: '操作',
      key: 'action',
      render: (_, record) => (
        <Space size="middle">
          <Link to={`/detail/${record._id}/edit`} className="link-style">
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
      <div>
        <SearchContainer
          items={[FilterGroupId, FilterKeyword, FilterTitle]}
          key={MenuArticle.route}
          onSearch={handleSearch}
        />
        <div style={{ height: 50 }}></div>
        <Table columns={columns} dataSource={articleData} />
      </div>
    </>
  );
};

export default Article;
