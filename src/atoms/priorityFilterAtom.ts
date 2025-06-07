import { atom } from 'recoil';

export type priorityFilter = 'all' | 'high' | 'medium' | 'low';

export const priorityFilterState = atom<priorityFilter>({
    key: 'priorityFilterState',
    default: 'all',
})