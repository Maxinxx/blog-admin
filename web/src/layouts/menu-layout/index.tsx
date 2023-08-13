import MyHeader from '@/components/header';
import { Button, Layout, Menu, MenuProps, Result, Spin } from 'antd';
import { FC, useEffect, useState } from 'react';
import { FileSearchOutlined, FileAddOutlined } from '@ant-design/icons';
import { MenuArticle } from '@/models/menu-model/menu';
import { history, useHistory } from 'umi';
import { useUser } from '@/store/user';
import { userInfo } from '@/services';

const { Sider, Content } = Layout;

const menus: MenuProps['items'] = [
  {
    key: '/article',
    icon: <FileSearchOutlined />,
    label: '文章',
  },
  {
    key: '/post',
    icon: <FileAddOutlined />,
    label: '发文',
  },
];

// 判断用户是否登录等权限信息
const AuthProvider: FC = (props) => {
  const { children } = props;
  const [isLogin, setIsLogin] = useState(false);
  const [loading, setLoading] = useState(true);

  const setUser = useUser((state) => state.setUser);

  useEffect(() => {
    userInfo().then((user) => {
      setLoading(false);
      const { name } = user;
      const loginSuccess = Boolean(name);
      if (loginSuccess) {
        setIsLogin(true);
        setUser({
          username: name,
          ...user,
        });
      } else {
        setIsLogin(false);
      }
    });
  }, []);

  if (loading) {
    return <Spin></Spin>;
  }

  return isLogin ? (
    children
  ) : (
    <Result
      status="403"
      subTitle="您还未登录，无法访问该页面"
      extra={
        <Button type="primary" onClick={() => history.push('/')}>
          去登录
        </Button>
      }
    />
  );
};

const MenuLayout: FC = (props) => {
  const { children } = props;
  const history = useHistory();
  const username = useUser((state) => state.username);
  const isLogin = Boolean(username);

  return (
    <Layout style={{ minHeight: '100vh' }}>
      <MyHeader showAvatar={isLogin} />
      <AuthProvider>
        <Layout>
          <Sider>
            <Menu
              onClick={(info) => history.push(info.key)}
              theme="dark"
              mode="inline"
              defaultSelectedKeys={[MenuArticle.route]}
              items={menus}
            />
          </Sider>
          <Content style={{ margin: '16px 16px' }}>{children}</Content>
        </Layout>
      </AuthProvider>
    </Layout>
  );
};

export default MenuLayout;
