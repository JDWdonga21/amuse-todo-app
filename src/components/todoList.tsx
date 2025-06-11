import React from 'react';
import { useRecoilValue } from 'recoil';
import { filteredTodoListSelector } from '../selectors/filteredTodoListSelector';
import TodoItem from './todoItem';

const TodoList = () => {
  const filteredTodos = useRecoilValue(filteredTodoListSelector);

  return (
    <div style={styles.container}>
      {filteredTodos.length === 0 ? (
        <div style={styles.emptyState}>
          <div style={styles.emptyIcon}>📝</div>
          <h3 style={styles.emptyTitle}>할 일이 없습니다</h3>
          <p style={styles.emptyDescription}>새로운 할 일을 추가해보세요!</p>
        </div>
      ) : (
        <div style={styles.list}>
          {filteredTodos.map((todo) => (
            <TodoItem key={todo.id} item={todo} />
          ))}
        </div>
      )}
    </div>
  );
};

const styles: { [key: string]: React.CSSProperties } = {
  container: {
    display: 'flex',
    flexDirection: 'column',
    flex: 1,
    minHeight: '0',
    height: '100%',
    width: '100%',
  },
  list: {
    display: 'block', // flex 대신 block 사용
    gap: '12px',
    flex: 1,
    overflowY: 'auto',
    padding: '0 4px 0 0', // 오른쪽만 스크롤바 여백
    width: '100%', // 전체 너비 사용
    // 커스텀 스크롤바 스타일링
    scrollbarWidth: 'thin',
    scrollbarColor: '#cbd5e1 transparent',
  },
  emptyState: {
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
    justifyContent: 'center',
    flex: 1,
    padding: '40px 20px',
    textAlign: 'center',
  },
  emptyIcon: {
    fontSize: '48px',
    marginBottom: '16px',
    opacity: 0.6,
  },
  emptyTitle: {
    fontSize: '18px',
    fontWeight: '600',
    color: '#64748b',
    margin: '0 0 8px 0',
  },
  emptyDescription: {
    fontSize: '14px',
    color: '#94a3b8',
    margin: 0,
  },
};

export default TodoList;