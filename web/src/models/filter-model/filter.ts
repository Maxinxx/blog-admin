interface FilterModel {
  filterItem: string;
  description: string;
}

const FilterGroupId: FilterModel = {
  filterItem: 'groupId',
  description: '文章ID',
};

const FilterKeyword: FilterModel = {
  filterItem: 'keyword',
  description: '关键词',
};

const FilterTitle: FilterModel = {
  filterItem: 'title',
  description: '标题',
};

const FilterType: FilterModel = {
  filterItem: 'type',
  description: '垂类',
};

const FilterUserId: FilterModel = {
  filterItem: 'userId',
  description: '用户ID',
};

export {
  FilterModel,
  FilterGroupId,
  FilterKeyword,
  FilterTitle,
  FilterType,
  FilterUserId,
};
