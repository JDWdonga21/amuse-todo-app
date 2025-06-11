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

  const handleKeyPress = (e: React.KeyboardEvent) => {
    if (e.key === 'Enter') {
      handleAdd();
    }
  };

  const getPriorityColor = (priority: string) => {
    switch (priority) {
      case 'high': return '#ef4444';
      case 'medium': return '#f59e0b';
      case 'low': return '#10b981';
      default: return '#6b7280';
    }
  };

  return (
    <div style={styles.container}>
      <div style={styles.form}>
        <div style={styles.inputGroup}>
          <input
            type="text"
            placeholder="할 일을 입력하세요..."
            value={text}
            onChange={(e) => setText(e.target.value)}
            onKeyPress={handleKeyPress}
            style={styles.input}
          />
        </div>
        
        <div style={styles.selectGroup}>
          <select 
            value={priority} 
            onChange={(e) => setPriority(e.target.value as any)} 
            style={{
              ...styles.select,
              borderColor: getPriorityColor(priority),
              color: getPriorityColor(priority),
            }}
          >
            <option value="high">🔴 높음</option>
            <option value="medium">🟡 중간</option>
            <option value="low">🟢 낮음</option>
          </select>
        </div>
        
        <button 
          onClick={handleAdd} 
          style={{
            ...styles.button,
            opacity: text.trim() ? 1 : 0.6,
            cursor: text.trim() ? 'pointer' : 'not-allowed',
          }}
          disabled={!text.trim()}
        >
          ➕ 추가
        </button>
      </div>
    </div>
  );
};

const styles: { [key: string]: React.CSSProperties } = {
  container: {
    width: '100%',
    height: '100%'
  },
  form: {
    display: 'flex',
    alignItems: 'stretch',
    gap: '12px',
    flexWrap: 'wrap',
  },
  inputGroup: {
    flex: '1 1 250px',
    minWidth: '200px',
  },
  input: {
    width: '100%',
    padding: '12px 16px',
    fontSize: '15px',
    borderRadius: '10px',
    border: '2px solid #e2e8f0',
    backgroundColor: '#ffffff',
    transition: 'all 0.2s ease',
    outline: 'none',
    boxSizing: 'border-box',
    fontFamily: 'inherit',
  },
  selectGroup: {
    flex: '0 0 120px',
  },
  select: {
    width: '100%',
    padding: '12px 12px',
    borderRadius: '10px',
    fontSize: '14px',
    fontWeight: '500',
    border: '2px solid',
    backgroundColor: '#ffffff',
    cursor: 'pointer',
    outline: 'none',
    transition: 'all 0.2s ease',
    boxSizing: 'border-box',
  },
  button: {
    flex: '0 0 auto',
    padding: '12px 20px',
    backgroundColor: '#3b82f6',
    color: 'white',
    border: 'none',
    borderRadius: '10px',
    fontSize: '14px',
    fontWeight: '600',
    cursor: 'pointer',
    whiteSpace: 'nowrap',
    transition: 'all 0.2s ease',
    boxShadow: '0 2px 8px rgba(59, 130, 246, 0.3)',
  },
};

export default AddTodoForm;
