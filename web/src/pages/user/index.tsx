import { FC } from 'react';
import { MenuArticle } from '@/models/menu-model/menu';
import SearchContainer from '@/components/search';
import { FilterType } from '@/models/filter-model/filter';

const User: FC = () => {
  return (
    <>
      <div>
        <SearchContainer
          items={[FilterType]}
          key={MenuArticle.route}
          onSearch={() => {}}
        />
      </div>
    </>
  );
};

export default User;
