import SignForm from '@/components/sign';
import './index.less';
import { register } from '@/services';
import { message } from 'antd';

export default function Register() {
  const onRegister = async (username: string, password: string) => {
    try {
      await register(username, password);
      message.success('Register Success.');
    } catch (e: any) {
      message.error(e?.msg || 'register error.');
    }
  };

  return (
    <div id="container">
      <h1 className="title" style={{ marginBottom: 50 }}>
        Register Now
      </h1>
      <SignForm onAction={onRegister} buttonText="Register" />
    </div>
  );
}
