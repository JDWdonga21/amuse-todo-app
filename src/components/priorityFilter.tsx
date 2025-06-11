import React from 'react';
import { useRecoilState } from 'recoil';
import { priorityFilterState, priorityFilter } from '../atoms/priorityFilterAtom';

const PriorityFilter = () => {
  const [priority, setPriority] = useRecoilState(priorityFilterState);

  return (
    <select
      value={priority}
      onChange={(e) => setPriority(e.target.value as priorityFilter)}
      style={{
        flex: 1,
        padding: '10px',
        borderRadius: '8px',
        fontSize: '14px',
        border: '1px solid #ccc',
        maxWidth: '300px',
      }}
    >
      <option value="all">전체</option>
      <option value="high">높음</option>
      <option value="medium">중간</option>
      <option value="low">낮음</option>
    </select>
  );
};

export default PriorityFilter;