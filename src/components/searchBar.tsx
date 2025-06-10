import React from 'react';
import { useRecoilState } from 'recoil';
import { filterState } from '../atoms/filterAtom';

const SearchBar = () => {
  const [filter, setFilter] = useRecoilState(filterState);

  return (
    <input
      type="text"
      placeholder="검색..."
      value={filter}
      onChange={(e) => setFilter(e.target.value)}
    />
  );
};

export default SearchBar;