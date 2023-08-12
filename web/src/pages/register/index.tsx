import SignForm from '@/components/sign';
import './index.less';
import { register } from '@/services';
import { message } from 'antd';
import { history } from 'umi';

export default function Register() {
  const onRegister = async (username: string, password: string) => {
    try {
      await register(username, password);
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
      <SignForm onAction={onRegister} buttonText="注册" />
    </div>
  );
}
