import React, { useState } from 'react';
import { useSetRecoilState } from 'recoil';
import { todoListState, TodoItemType } from '../atoms/todoListAtom';
import { v4 as uuidv4 } from 'uuid';

const AddTodoForm = () => {
  const [text, setText] = useState('');
  const [priority, setPriority] = useState<'low' | 'medium' | 'high'>('medium');
  const setTodoList = useSetRecoilState(todoListState);

  const handleAdd = () => {
    if (!text.trim()) return;
    const newTodo: TodoItemType = {
      id: uuidv4(),
      text,
      completed: false,
      priority,
      createdAt: new Date().toISOString(),
    };
    setTodoList((prev) => [...prev, newTodo]);
    setText('');
  };

  return (
    <div style={styles.form}>
      <input
        type="text"
        placeholder="할 일을 입력하세요"
        value={text}
        onChange={(e) => setText(e.target.value)}
        style={styles.input}
      />
      <select value={priority} onChange={(e) => setPriority(e.target.value as any)} style={styles.select}>
        <option value="high">높음</option>
        <option value="medium">중간</option>
        <option value="low">낮음</option>
      </select>
      <button onClick={handleAdd} style={styles.button}>추가</button>
    </div>
  );
};

const styles: { [key: string]: React.CSSProperties } = {
  form: {
    display: 'flex',
    alignItems: 'center',
    gap: '8px',
    flexWrap: 'wrap',
    marginBottom: '20px',
  },
  input: {
    flexGrow: 1,
    minWidth: '150px',
    padding: '8px 10px',
    fontSize: '14px',
    borderRadius: '8px',
    border: '1px solid #ccc',
  },
  select: {
    padding: '8px',
    borderRadius: '8px',
    fontSize: '14px',
    width: '90px',
  },
  button: {
    padding: '8px 14px',
    backgroundColor: '#1976d2',
    color: 'white',
    border: 'none',
    borderRadius: '8px',
    fontWeight: 'bold',
    cursor: 'pointer',
    whiteSpace: 'nowrap',
  },
};

export default AddTodoForm;
