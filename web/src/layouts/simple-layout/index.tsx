import Header from '@/components/header';
import { FC } from 'react';

const SimpleLayout: FC = (props) => {
  const { children } = props;

  return (
    <>
      <Header />
      {children}
    </>
  );
};

export default SimpleLayout;
