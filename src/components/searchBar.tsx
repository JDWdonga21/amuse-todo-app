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
      style={{
        flex: 1,
        padding: '10px',
        borderRadius: '8px',
        border: '1px solid #ccc',
        fontSize: '14px',
      }}
    />
  );
};

export default SearchBar;