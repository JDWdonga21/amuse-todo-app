import React from 'react';
import { useRecoilValue } from 'recoil';
import { filteredTodoListSelector } from '../selectors/filteredTodoListSelector';
import TodoItem from './todoItem';

const TodoList = () => {
  const filteredTodos = useRecoilValue(filteredTodoListSelector);

  return (
    <div>
      {filteredTodos.map((todo) => (
        <TodoItem key={todo.id} item={todo} />
      ))}
    </div>
  );
};

export default TodoList;