import React, { useState } from 'react';
import { useSetRecoilState } from 'recoil';
import { todoListState, TodoItemType } from '../atoms/todoListAtom';

import Tbutton from './todoButton';

const TodoItem = ({ item }: { item: TodoItemType }) => {
  const setTodoList = useSetRecoilState(todoListState);
  const [isEditing, setIsEditing] = useState(false);
  const [newText, setNewText] = useState(item.text);

  const updateTodo = () => {
    setTodoList((oldList) =>
      oldList.map((todo) =>
        todo.id === item.id ? { ...todo, text: newText } : todo
      )
    );
    setIsEditing(false);
  };

  const deleteTodo = () => {
    setTodoList((oldList) => oldList.filter((todo) => todo.id !== item.id));
  };

  const toggleComplete = () => {
    setTodoList((oldList) =>
      oldList.map((todo) =>
        todo.id === item.id ? { ...todo, completed: !todo.completed } : todo
      )
    );
  };

  return (
    <div>
      <span
        style={{
          textDecoration: item.completed ? 'line-through' : 'none',
          color: item.priority === 'high' ? 'red' : item.priority === 'low' ? 'gray' : 'black',
        }}
      >
        {isEditing ? (
          <>
            <input value={newText} onChange={(e) => setNewText(e.target.value)} />
            <Tbutton 
                text='저장'
                onButtonClick={updateTodo}
            >

            </Tbutton>
          </>
        ) : (
          <>
            {item.text}
            <Tbutton 
                text='수정'
                onButtonClick={() => setIsEditing(true)}
            >

            </Tbutton>
          </>
        )}
      </span>
        <Tbutton 
            text={item.completed ? '되돌리기' : '완료'}
            onButtonClick={toggleComplete}
        >

        </Tbutton>
        <Tbutton 
            text='삭제'
            onButtonClick={deleteTodo}
        >

        </Tbutton>
    </div>
  );
};

export default TodoItem;