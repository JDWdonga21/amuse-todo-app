import { atom } from 'recoil'

export interface TodoItemType {
    id: string,
    text: string,
    completed: boolean,
    priority: 'high' | 'medium' | 'low';
    createdAt: string
}

export const todoListState = atom<TodoItemType[]>({
    key: 'todoListState',
    default: [],
});