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
    <table style={{ 
      width: '100%', 
      backgroundColor: '#ffffff',
      border: '1px solid #e2e8f0',
      borderLeft: `4px solid ${getPriorityColor(item.priority)}`,
      borderRadius: '8px',
      marginBottom: '8px',
      borderCollapse: 'separate',
      borderSpacing: 0,
      height: 'auto', // 고정 높이 제거
    }}>
      <tbody>
        <tr style={{ height: '50px' }}> {/* 행 높이 고정 */}
          <td style={{ 
            width: '40px', 
            padding: '12px 8px', // 패딩 줄임
            textAlign: 'center',
            verticalAlign: 'middle' 
          }}>
            <input
              type="checkbox"
              checked={item.completed}
              onChange={toggleComplete}
              style={{ 
                width: '16px', // 크기 줄임
                height: '16px',
                cursor: 'pointer'
              }}
            />
          </td>
          
          <td style={{ 
            padding: '12px 8px', // 패딩 줄임
            verticalAlign: 'middle',
            fontSize: '14px', // 폰트 크기 줄임
            textDecoration: item.completed ? 'line-through' : 'none',
            color: item.completed ? '#999' : '#333',
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
                style={{
                  width: '100%',
                  padding: '6px 8px', // 패딩 줄임
                  fontSize: '14px',
                  border: '1px solid #ccc',
                  borderRadius: '4px',
                  boxSizing: 'border-box',
                }}
                autoFocus
              />
            ) : (
              <span>{item.text}</span>
            )}
          </td>
          
          <td style={{ 
            width: '90px', // 너비 더 증가
            padding: '12px 8px',
            textAlign: 'center',
            verticalAlign: 'middle' 
          }}>
            <span style={{
              fontSize: '13px', // 폰트 크기 더 증가
              padding: '8px 12px', // 패딩 더 증가
              backgroundColor: getPriorityColor(item.priority),
              color: 'white',
              borderRadius: '6px', // 테두리 반경 더 증가
              display: 'inline-block',
              lineHeight: '1.2',
              minWidth: '60px', // 최소 너비 더 증가
              height: '28px', // 높이 더 증가 (버튼과 비슷)
              boxSizing: 'border-box',
              textAlign: 'center',
              fontWeight: '600', // 폰트 굵기 추가
            }}>
              {item.priority}
            </span>
          </td>
          
          <td style={{ 
            width: '80px', // 너비 줄임
            padding: '12px 8px',
            textAlign: 'right',
            verticalAlign: 'middle' 
          }}>
            <div style={{
              display: 'flex',
              gap: '3px',
              justifyContent: 'flex-end',
              alignItems: 'center',
            }}>
              {isEditing ? (
                <button 
                  onClick={updateTodo}
                  style={{
                    padding: '6px 8px', // 패딩 증가
                    fontSize: '12px', // 폰트 크기 증가
                    backgroundColor: '#10b981',
                    color: 'white',
                    border: 'none',
                    borderRadius: '4px',
                    cursor: 'pointer',
                    width: '32px', // 너비 증가
                    height: '32px', // 높이 증가
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                  }}
                >
                  ✓
                </button>
              ) : (
                <button 
                  onClick={() => setIsEditing(true)}
                  style={{
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
                  }}
                >
                  ✏️
                </button>
              )}
              <button 
                onClick={deleteTodo}
                style={{
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
                }}
              >
                🗑️
              </button>
            </div>
          </td>
        </tr>
      </tbody>
    </table>
  );
};

export default TodoItem;