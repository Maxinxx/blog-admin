import MyHeader from '@/components/header';
import { Layout, Menu, MenuProps } from 'antd';
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
import { useHistory } from 'umi';

const { Header, Sider, Content } = Layout;

// 菜单列表
const siderItemList: MenuModel[] = [
  MenuUser,
  MenuArticle,
  MenuComment,
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

const MenuLayout: FC = (props) => {
  const { children } = props;
  const history = useHistory();

  return (
    <Layout style={{ minHeight: '100vh' }}>
      <MyHeader />
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
    </Layout>
  );
};

export default MenuLayout;
