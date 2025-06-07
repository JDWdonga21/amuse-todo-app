import { selector } from "recoil";
import { todoListState } from "../atoms/todoListAtom";
import { filterState } from "../atoms/filterAtom";
import { priorityFilterState } from "../atoms/priorityFilterAtom";

export const filteredTodoListSelector = selector({
    key: 'filteredTodoListSelector',
    get: ({get}) => {
        const list = get(todoListState);
        const keyword = get(filterState).toLowerCase();
        const priority = get(priorityFilterState);

        return list.filter((todo)=>{
            const matchesKeyword = todo.text.toLowerCase().includes(keyword);
            const matchesPriority = priority === 'all' || todo.priority === priority;
            return matchesKeyword && matchesPriority;
        })
    },
})