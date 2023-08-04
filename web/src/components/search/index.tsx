import React from 'react';
import SearchInput from '../../common-components/search-input';
import { Row, Col, Button } from 'antd';
import { SearchOutlined } from '@ant-design/icons';
import * as Filters from '../../models/filter-model/filter';
import './index.less';

interface SearchContainerProps {
  items: Filters.FilterModel[];
  key: string;
  onSearch: (map: Map<string, string[]>) => void;
}

const SearchContainer: React.FC<SearchContainerProps> = (props) => {
  const { items, key, onSearch } = props;
  const filterMap = new Map<string, string[]>();

  const handleInput = (searchItem: string, value: string[]) => {
    filterMap.set(searchItem, value);
  };

  return (
    <div className="container">
      <Row className="filter-group" gutter={[32, 32]}>
        {items.map((item) => {
          return (
            <Col span={8} key={`${key}+${item.filterItem}`}>
              {item.description}:{' '}
              <SearchInput
                style={{ width: 250 }}
                onInput={handleInput}
                searchItem={item.filterItem}
              />
            </Col>
          );
        })}
      </Row>
      <Button
        className="button"
        type="primary"
        icon={<SearchOutlined />}
        onClick={() => onSearch(filterMap)}
      >
        Search
      </Button>
    </div>
  );
};

export default SearchContainer;
