import { FC } from 'react';
import MenuLayout from './menu-layout';
import SimpleLayout from './simple-layout';

const IndexLayout: FC = (props) => {
  const { children } = props;
  if (['/', '/register'].some((path) => location.pathname === path)) {
    return <SimpleLayout>{props.children}</SimpleLayout>;
  }

  return <MenuLayout>{children}</MenuLayout>;
};

export default IndexLayout;
