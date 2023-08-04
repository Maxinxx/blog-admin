import { Layout } from 'antd';
import { FC } from 'react';
import './index.less';

const { Header: LayoutHeader } = Layout;
const Header: FC = () => {
  return (
    <LayoutHeader className="blog-header">
      <div className="logo">
        <img src={require('@/assets/logo.png')} alt="logo" width={40} />
      </div>
      <span className="title">博客管理系统</span>
    </LayoutHeader>
  );
};

export default Header;
