import MyHeader from '@/components/header';
import { Button, Layout, Menu, MenuProps, Result } from 'antd';
import { FC } from 'react';
import {
  UserOutlined,
  CommentOutlined,
  FileSearchOutlined,
  FileAddOutlined,
} from '@ant-design/icons';
import {
  MenuModel,
  MenuUser,
  MenuArticle,
  MenuComment,
  MenuCreateArticle,
} from '@/models/menu-model/menu';
import React from 'react';
import { history, useHistory } from 'umi';
import { useUser } from '@/store/user';

const { Sider, Content } = Layout;

// 菜单列表
const siderItemList: MenuModel[] = [
  MenuArticle,
  MenuComment,
  MenuUser,
  MenuCreateArticle,
];

const items: MenuProps['items'] = [
  UserOutlined,
  FileSearchOutlined,
  CommentOutlined,
  FileAddOutlined,
].map((icon, index) => ({
  key: siderItemList[index].route,
  icon: React.createElement(icon),
  label: siderItemList[index].description,
}));

// 判断用户是否登录等权限信息
const AuthProvider: FC = (props) => {
  const { children } = props;
  const username = useUser((state) => state.username);
  const isLogin = Boolean(username);
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
              items={items}
            />
          </Sider>
          <Content style={{ margin: '16px 16px' }}>{children}</Content>
        </Layout>
      </AuthProvider>
    </Layout>
  );
};

export default MenuLayout;
