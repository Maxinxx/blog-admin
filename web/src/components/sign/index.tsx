import { LockOutlined, UserOutlined } from '@ant-design/icons';
import { Button, Form, Input } from 'antd';
import './index.less';

interface SignFormProps {
  onAction: (userName: string, password: string) => void;
  buttonText: string;
}

const SignForm: React.FC<SignFormProps> = (props: SignFormProps) => {
  const { buttonText, onAction } = props;

  const onFinish = (values: any) => {
    const { username, password } = values;
    onAction(username, password);
  };

  return (
    <Form
      name="normal_login"
      className="login-form"
      initialValues={{ remember: true }}
      onFinish={onFinish}
    >
      <Form.Item
        name="username"
        rules={[{ required: true, message: 'Please input your Username!' }]}
      >
        <Input
          prefix={<UserOutlined className="site-form-item-icon" />}
          placeholder="用户名"
        />
      </Form.Item>
      <Form.Item
        name="password"
        rules={[{ required: true, message: 'Please input your Password!' }]}
      >
        <Input
          prefix={<LockOutlined className="site-form-item-icon" />}
          type="password"
          placeholder="密码"
        />
      </Form.Item>

      <Form.Item style={{ marginBottom: 4 }}>
        <Button type="primary" htmlType="submit" className="login-form-button">
          {buttonText}
        </Button>
      </Form.Item>
    </Form>
  );
};

export default SignForm;
