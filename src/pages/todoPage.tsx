import React, { useEffect } from 'react';
import { useRecoilState } from 'recoil';
import AddTodoForm from '../components/addTodoForm';
import SearchBar from '../components/searchBar';
import PriorityFilter from '../components/priorityFilter';
import TodoList from '../components/todoList';
import { todoListState } from '../atoms/todoListAtom';

const TodoPage = () => {
  const [todoList, setTodoList] = useRecoilState(todoListState);

  // Load from localStorage on mount
  useEffect(() => {
    const saved = localStorage.getItem('todoList');
    if (saved) {
      setTodoList(JSON.parse(saved));
    }
  }, [setTodoList]);

  // Save to localStorage on change
  useEffect(() => {
    localStorage.setItem('todoList', JSON.stringify(todoList));
  }, [todoList]);

  return (
    <div style={styles.wrapper}>
      {/* CSS Reset for text direction */}
      <div style={styles.container}>
        <div style={styles.header}>
          <h1 style={styles.title}>📋 TODO 리스트</h1>
        </div>
        
        <div style={styles.controlsSection}>
          <div style={styles.controls}>
            <SearchBar />
            <PriorityFilter />
          </div>
          <div style={styles.addArea}>
            <AddTodoForm />
          </div>
        </div>
        
        <div style={styles.listSection}>
          <TodoList />
        </div>
      </div>
    </div>
  );
};

const styles: { [key: string]: React.CSSProperties } = {
  wrapper: {
    minHeight: '100vh',
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'flex-start',
    backgroundColor: '#f8fafc',
    padding: '20px 16px',
  },
  container: {
    display: 'flex',
    flexDirection: 'column',
    width: '100%',
    maxWidth: '700px',
    minHeight: '85vh',
    backgroundColor: '#ffffff',
    borderRadius: '16px',
    boxShadow: '0 8px 30px rgba(0, 0, 0, 0.12)',
    border: '1px solid #e2e8f0',
    overflow: 'scroll',
  },
  header: {
    padding: '24px 24px 16px 24px',
    borderBottom: '1px solid #e2e8f0',
    backgroundColor: '#fafbfc',
    borderRadius: '16px 16px 0 0',
    height: '40px',
  },
  title: {
    fontSize: '28px',
    fontWeight: '700',
    color: '#1e293b',
    textAlign: 'center',
    margin: 0,
    letterSpacing: '-0.025em',
  },
  controlsSection: {
    padding: '20px 24px',
    borderBottom: '1px solid #f1f5f9',
    backgroundColor: '#fefefe',
    height: '15vh',
  },
  controls: {
    display: 'flex',
    gap: '12px',
    marginBottom: '16px',
    flexWrap: 'wrap',
    alignItems: 'center',
    height: '40px',
  },
  addArea: {
    display: 'flex',
    height: '50px',
  },
  listSection: {
    flex: 1,
    padding: '26px 24px 24px 24px',
    minHeight: '0', // 중요: flex item이 제대로 줄어들 수 있도록
    display: 'flex',
    flexDirection: 'column',
  },
};

export default TodoPage;