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
    <div style={styles.container}>
      <h1 style={styles.header}>📋 TODO 리스트</h1>
      <div style={styles.controls}>
        <SearchBar />
        <PriorityFilter />
      </div>
      <div style={{height: '60px'}}>
        <AddTodoForm />
      </div>
      <div style={{height: 'calc(100% - 140px)'}}>
        <TodoList />
      </div>      
    </div>
  );
};

const styles: { [key: string]: React.CSSProperties } = {
  container: {
    width: '600px',
    height: '100%',
    margin: '0 auto',
    padding: '20px',
    backgroundColor: '#fefefe',
    borderRadius: '10px',
    boxShadow: '0 4px 10px rgba(0,0,0,0.1)',
    marginTop: '40px',
  },
  header: {
    height: '40px',
    textAlign: 'center',
    marginBottom: '20px',
    color: '#1976d2',
  },
  controls: {
    height: '40px',
    display: 'flex',
    justifyContent: 'space-between',
    marginBottom: '20px',
    gap: '10px',
  },
};

export default TodoPage;