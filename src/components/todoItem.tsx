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

  const containerStyle: React.CSSProperties = {
    display: 'flex',
    justifyContent: 'space-between',
    alignItems: 'center',
    backgroundColor: '#f9fbfd',
    padding: '12px 16px',
    borderRadius: '10px',
    marginBottom: '10px',
    borderLeft: `6px solid ${
      item.priority === 'high' ? 'red' :
      item.priority === 'medium' ? 'orange' : 'gray'
    }`,
  };

  const textStyle: React.CSSProperties = {
    fontSize: '16px',
    textDecoration: item.completed ? 'line-through' : 'none',
    color: item.completed ? '#aaa' : '#333',
  };

  const buttonContainer: React.CSSProperties = {
    display: 'flex',
    gap: '8px',
    justifyContent: 'flex-end',
    flexWrap: 'wrap',
  };

  return (
    <div style={containerStyle}>
      <div style={{ flex: 1 }}>
        {isEditing ? (
          <>
            <input
              value={newText}
              onChange={(e) => setNewText(e.target.value)}
              style={{ marginRight: '8px' }}
            />
            <Tbutton text="저장" type="save" onButtonClick={updateTodo} />
          </>
        ) : (
          <span style={textStyle}>{item.text}</span>
        )}
      </div>
      <div style={buttonContainer}>
        {!isEditing && (
          <Tbutton text="수정" type="edit" onButtonClick={() => setIsEditing(true)} />
        )}
        <Tbutton
          text={item.completed ? '되돌리기' : '완료'}
          type={item.completed ? 'undo' : 'complete'}
          onButtonClick={toggleComplete}
        />
        <Tbutton text="삭제" type="delete" onButtonClick={deleteTodo} />
      </div>
    </div>
  );
};

export default TodoItem;
