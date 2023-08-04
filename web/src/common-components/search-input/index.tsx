import React from 'react';
import { Select } from 'antd';
import type { SelectProps } from 'antd';

interface SearchInputProps extends SelectProps {
  onInput: (searchItem: string, value: string[]) => void;
  searchItem: string;
}

const SearchInput: React.FC<SearchInputProps> = (props) => {
  const { onInput, searchItem, ...restProps } = props;

  return (
    <Select
      {...restProps}
      mode="tags"
      onChange={(value) => {
        onInput(searchItem, value);
      }}
      tokenSeparators={[',']}
    />
  );
};

export default SearchInput;
