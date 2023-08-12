import { Link, history } from 'umi';
import SignForm from '@/components/sign';
import { login } from '@/services';
import './index.less';
import { message } from 'antd';
import { useUser } from '@/store/user';

export default function IndexPage() {
  const setUser = useUser((state) => state.setUser);

  const jumpToArticle = () => {
    history.push('/article');
  };

  const onLogin = async (username: string, password: string) => {
    try {
      const user = await login(username, password);
      setUser({
        username: user.name,
        ...user,
      });
      message.success('登录成功');
      jumpToArticle();
    } catch (e) {
      if (e instanceof Error) {
        message.error(e.message || '登录失败');
      }
    }
  };

  return (
    <div id="container">
      <div className="wrapper">
        <h1 className="title" style={{ margin: 50 }}>
          登录
        </h1>
        <SignForm onAction={onLogin} buttonText="登录" />
        <div className="login-to-register">
          没有账号？
          <Link to="/register" className="link-style">
            去注册
          </Link>
        </div>
      </div>
    </div>
  );
}
