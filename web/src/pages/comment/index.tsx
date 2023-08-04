import { FC } from 'react';
import { MenuArticle } from '@/models/menu-model/menu';
import SearchContainer from '@/components/search';
import { FilterGroupId, FilterUserId } from '@/models/filter-model/filter';

const Comment: FC = () => {
  return (
    <>
      <div>
        <SearchContainer
          items={[FilterUserId, FilterGroupId]}
          key={MenuArticle.route}
          onSearch={() => {}}
        />
      </div>
    </>
  );
};

export default Comment;
