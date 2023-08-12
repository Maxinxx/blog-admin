import { Avatar, Layout } from 'antd';
import { FC } from 'react';
import './index.less';
import { history } from 'umi';
import { useUser } from '@/store/user';

const { Header: LayoutHeader } = Layout;

export interface HeaderProps {
  showAvatar?: boolean;
}

const Header: FC<HeaderProps> = (props) => {
  const { showAvatar } = props;
  const [username, avatar] = useUser((state) => [state.username, state.avatar]);

  const jumpHome = () => {
    history.push('/');
  };
  return (
    <LayoutHeader className="blog-header">
      <div className="logo-title" onClick={jumpHome}>
        <div className="logo">
          <img src={require('@/assets/logo.png')} alt="logo" width={40} />
        </div>
        <span className="title">博客管理系统</span>
      </div>
      {showAvatar && (
        <Avatar
          style={{
            backgroundColor: '#87d068',
          }}
        >
          {avatar ? <img src={avatar} alt="头像" /> : username}
        </Avatar>
      )}
    </LayoutHeader>
  );
};

export default Header;
