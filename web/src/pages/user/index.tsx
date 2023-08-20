import { FC, useEffect, useState } from 'react';
import { Button, Form, Input, InputNumber, message, Select, Table } from 'antd';
import type { ColumnsType } from 'antd/es/table';
import dayjs from 'dayjs';
import 'dayjs/locale/zh-cn';
import { User } from '@/types/user';
import { getUsers } from '@/services/user';

const Users: FC = () => {
  const [users, setUsers] = useState<User[]>([]);
  const [form] = Form.useForm();
  useEffect(() => {
    const getData = async () => {
      const data = await getUsers({});
      setUsers(data);
    };
    getData();
  }, []);

  const handleSearch = async () => {
    try {
      const params = form.getFieldsValue();
      const res = await getUsers(params);
      setUsers(res);
    } catch (e) {
      if (e instanceof Error) {
        message.error(e.message || '查询出错');
      }
    }
  };

  const columns: ColumnsType<User> = [
    {
      title: '用户 ID',
      dataIndex: '_id',
      key: '_id',
    },
    {
      title: '用户名',
      dataIndex: 'name',
      key: 'name',
    },
    {
      title: '年龄',
      key: 'age',
      dataIndex: 'age',
    },
    {
      title: '性别',
      key: 'gender',
      dataIndex: 'gender',
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
        <Form.Item label="用户名" name="name">
          <Input style={{ width: 300 }} allowClear />
        </Form.Item>
        <Form.Item label="年龄" name="age">
          <InputNumber style={{ width: 300 }} />
        </Form.Item>
        <Form.Item label="性别" name="gender">
          <Select
            style={{ width: 300 }}
            options={[
              {
                label: '男',
                value: '男',
              },
              {
                label: '女',
                value: '女',
              },
            ]}
            allowClear
          />
        </Form.Item>
        <Form.Item>
          <Button type="primary" onClick={handleSearch}>
            查询
          </Button>
        </Form.Item>
      </Form>
      <Table columns={columns} dataSource={users} rowKey="_id" />
    </>
  );
};

export default Users;
