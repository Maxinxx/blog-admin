import { Link, useHistory } from 'umi';
import SignForm from '@/components/sign';
import { login } from '@/services';
import './index.less';
import { message } from 'antd';

export default function IndexPage() {
  const history = useHistory();

  const jumpToHome = () => {
    history.push('/home');
  };

  const onLogin = async (username: string, password: string) => {
    try {
      await login(username, password);
      message.success('Success Login.');
      jumpToHome();
    } catch (e: any) {
      message.error(e?.msg || 'login error.');
    }
  };

  return (
    <div id="container">
      <div className="wrapper">
        <h1 className="title" style={{ margin: 50 }}>
          Welcome
        </h1>
        <SignForm onAction={onLogin} buttonText="Log in" />
        <div className="login-to-register">
          Or{' '}
          <Link to="/register" className="link-style">
            register now!
          </Link>
        </div>
      </div>
    </div>
  );
}
