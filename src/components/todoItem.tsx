import React, { useState } from 'react';
import { useSetRecoilState } from 'recoil';
import { todoListState, TodoItemType } from '../atoms/todoListAtom';

const TodoItem = ({ item }: { item: TodoItemType }) => {
  const setTodoList = useSetRecoilState(todoListState);
  const [isEditing, setIsEditing] = useState(false);
  const [newText, setNewText] = useState(item.text);

  const updateTodo = () => {
    if (!newText.trim()) {
      setNewText(item.text);
      setIsEditing(false);
      return;
    }
    setTodoList((oldList) =>
      oldList.map((todo) =>
        todo.id === item.id ? { ...todo, text: newText.trim() } : todo
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
                onBlur={updateTodo}
                onKeyDown={(e) => {
                  if (e.key === 'Enter') updateTodo();
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
            <span style={{
              ...styles.priorityTag,
              backgroundColor: getPriorityColor(item.priority)
            }}>
              {item.priority === 'high' ? '높음' : item.priority === 'medium' ? '중간' : '낮음'}
            </span>
          </td>

          <td style={styles.actions}>
            <div style={styles.actionGroup}>
              {isEditing ? (
                <button style={styles.saveButton} onClick={updateTodo}>✓</button>
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
