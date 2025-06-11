import React, { useState } from 'react';
import { useSetRecoilState } from 'recoil';
import { todoListState, TodoItemType } from '../atoms/todoListAtom';

const TodoItem = ({ item }: { item: TodoItemType }) => {
  const setTodoList = useSetRecoilState(todoListState);
  const [isEditing, setIsEditing] = useState(false);
  const [isPriorityEditing, setIsPriorityEditing] = useState(false);
  const [newText, setNewText] = useState(item.text);

  const updateTodo = () => {
    const trimmedText = newText.trim();
    
    // 빈 텍스트인 경우 원래 텍스트로 되돌리고 편집 모드 종료
    if (!trimmedText) {
      setNewText(item.text);
      setIsEditing(false);
      return;
    }
    
    // Todo 업데이트
    setTodoList((oldList) =>
      oldList.map((todo) =>
        todo.id === item.id ? { ...todo, text: trimmedText } : todo
      )
    );
    
    // 편집 모드 종료
    setIsEditing(false);
  };

  const deleteTodo = () => {
    setTodoList((oldList) => oldList.filter((todo) => todo.id !== item.id));
  };

  const updatePriority = (newPriority: 'high' | 'medium' | 'low') => {
    setTodoList((oldList) =>
      oldList.map((todo) =>
        todo.id === item.id ? { ...todo, priority: newPriority } : todo
      )
    );
    setIsPriorityEditing(false);
  };

  const toggleComplete = () => {
    setTodoList((oldList) =>
      oldList.map((todo) =>
        todo.id === item.id ? { ...todo, completed: !todo.completed } : todo
      )
    );
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
    <table style={{ ...styles.table, borderLeft: `4px solid ${getPriorityColor(item.priority)}` }}>
      <tbody>
        <tr style={styles.tRow}>
          <td style={styles.checkbox}>
            <input
              type="checkbox"
              checked={item.completed}
              onChange={toggleComplete}
              style={styles.checkboxInput}
            />
          </td>

          <td style={{
            ...styles.text,
            textDecoration: item.completed ? 'line-through' : 'none',
            color: item.completed ? '#999' : '#333'
          }}>
            {isEditing ? (
              <input
                type="text"
                value={newText}
                onChange={(e) => setNewText(e.target.value)}
                onBlur={(e) => {
                  // 저장 버튼 클릭이 아닌 경우에만 blur 처리
                  if (!e.relatedTarget || !e.relatedTarget.closest('button')) {
                    updateTodo();
                  }
                }}
                onKeyDown={(e) => {
                  if (e.key === 'Enter') {
                    e.preventDefault();
                    updateTodo();
                  }
                  if (e.key === 'Escape') {
                    setNewText(item.text);
                    setIsEditing(false);
                  }
                }}
                style={styles.editInput}
                autoFocus
              />
            ) : (
              <span>{item.text}</span>
            )}
          </td>

          <td style={styles.priority}>
            {isPriorityEditing ? (
              <select
                value={item.priority}
                onChange={(e) => updatePriority(e.target.value as 'high' | 'medium' | 'low')}
                onBlur={() => setIsPriorityEditing(false)}
                style={styles.prioritySelect}
                autoFocus
              >
                <option value="high">높음</option>
                <option value="medium">중간</option>
                <option value="low">낮음</option>
              </select>
            ) : (
              <span 
                style={{
                  ...styles.priorityTag,
                  backgroundColor: getPriorityColor(item.priority),
                  cursor: 'pointer'
                }}
                onClick={() => setIsPriorityEditing(true)}
              >
                {item.priority === 'high' ? '높음' : item.priority === 'medium' ? '중간' : '낮음'}
              </span>
            )}
          </td>

          <td style={styles.actions}>
            <div style={styles.actionGroup}>
              {isEditing ? (
                <button 
                  style={styles.saveButton} 
                  onClick={(e) => {
                    e.preventDefault();
                    e.stopPropagation();
                    updateTodo();
                  }}
                >
                  ✓
                </button>
              ) : (
                <button style={styles.editButton} onClick={() => setIsEditing(true)}>✏️</button>
              )}
              <button style={styles.deleteButton} onClick={deleteTodo}>🗑️</button>
            </div>
          </td>
        </tr>
      </tbody>
    </table>
  );
};

const styles: { [key: string]: React.CSSProperties } = {
  table: {
    width: '100%',
    maxWidth: '600px',
    backgroundColor: '#ffffff',
    border: '1px solid #e2e8f0',
    borderRadius: '8px',
    marginBottom: '8px',
    borderCollapse: 'separate',
    borderSpacing: 0,
    height: 'auto',
  },
  tRow: {
    height: '50px',
  },
  checkbox: {
    width: '40px',
    padding: '12px 8px',
    textAlign: 'center',
    verticalAlign: 'middle',
  },
  checkboxInput: {
    width: '16px',
    height: '16px',
    cursor: 'pointer',
  },
  text: {
    padding: '12px 8px',
    verticalAlign: 'middle',
    fontSize: '14px',
  },
  editInput: {
    width: '100%',
    padding: '6px 8px',
    fontSize: '14px',
    border: '1px solid #ccc',
    borderRadius: '4px',
    boxSizing: 'border-box',
  },
  priority: {
    width: '90px',
    padding: '12px 8px',
    textAlign: 'center',
    verticalAlign: 'middle',
  },
  priorityTag: {
    fontSize: '13px',
    padding: '8px 12px',
    color: 'white',
    borderRadius: '6px',
    display: 'inline-block',
    lineHeight: '1.2',
    minWidth: '60px',
    height: '28px',
    boxSizing: 'border-box',
    textAlign: 'center',
    fontWeight: 600,
    cursor: 'pointer',
    transition: 'opacity 0.2s ease',
  },
  prioritySelect: {
    fontSize: '13px',
    padding: '6px 8px',
    border: '1px solid #ccc',
    borderRadius: '6px',
    backgroundColor: 'white',
    color: '#333',
    cursor: 'pointer',
    minWidth: '60px',
    height: '32px',
    boxSizing: 'border-box',
    textAlign: 'center',
    fontWeight: 600,
  },
  actions: {
    width: '80px',
    padding: '12px 8px',
    textAlign: 'right',
    verticalAlign: 'middle',
  },
  actionGroup: {
    display: 'flex',
    gap: '3px',
    justifyContent: 'flex-end',
    alignItems: 'center',
  },
  editButton: {
    padding: '6px 8px',
    fontSize: '12px',
    backgroundColor: '#3b82f6',
    color: 'white',
    border: 'none',
    borderRadius: '4px',
    cursor: 'pointer',
    width: '32px',
    height: '32px',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
  },
  saveButton: {
    padding: '6px 8px',
    fontSize: '12px',
    backgroundColor: '#10b981',
    color: 'white',
    border: 'none',
    borderRadius: '4px',
    cursor: 'pointer',
    width: '32px',
    height: '32px',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
  },
  deleteButton: {
    padding: '6px 8px',
    fontSize: '12px',
    backgroundColor: '#ef4444',
    color: 'white',
    border: 'none',
    borderRadius: '4px',
    cursor: 'pointer',
    width: '32px',
    height: '32px',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
  },
};

export default TodoItem;