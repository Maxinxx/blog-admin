import SignForm from '@/components/sign';
import './index.less';
import { register } from '@/services';
import { Button, Form, Input, InputNumber, Select, message } from 'antd';
import { history } from 'umi';
import { LockOutlined, UserOutlined } from '@ant-design/icons';
import { User } from '@/types/user';

export default function Register() {
  const onRegister = async (values: Omit<User, 'uid'>) => {
    try {
      await register(values);
      message.success('注册成功');
      history.push('/');
    } catch (e) {
      if (e instanceof Error) {
        message.error(e.message || '注册失败');
      }
    }
  };

  return (
    <div id="register-container">
      <h1 style={{ margin: 50 }}>注册</h1>
      <Form
        name="normal_login"
        className="login-form"
        layout="vertical"
        initialValues={{ remember: true }}
        onFinish={onRegister}
      >
        <Form.Item
          name="name"
          label="用户名"
          rules={[{ required: true, message: '请输入名称' }]}
        >
          <Input
            prefix={<UserOutlined className="site-form-item-icon" />}
            placeholder="用户名"
          />
        </Form.Item>
        <Form.Item
          name="password"
          label="密码"
          rules={[{ required: true, message: '请输入密码' }]}
        >
          <Input
            prefix={<LockOutlined className="site-form-item-icon" />}
            type="password"
            placeholder="密码"
          />
        </Form.Item>

        <Form.Item
          name="age"
          label="年龄"
          rules={[{ required: true, message: '请输入年龄' }]}
        >
          <InputNumber style={{ width: '100%' }} placeholder="年龄" />
        </Form.Item>

        <Form.Item
          name="gender"
          label="性别"
          rules={[{ required: true, message: '请选择性别' }]}
        >
          <Select
            placeholder="性别"
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
          />
        </Form.Item>

        <Form.Item style={{ marginBottom: 4 }}>
          <Button
            type="primary"
            htmlType="submit"
            className="login-form-button"
          >
            注册
          </Button>
        </Form.Item>
      </Form>
    </div>
  );
}
