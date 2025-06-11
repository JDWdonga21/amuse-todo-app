import React from "react";

interface TbuttonProps {
  text: string;
  onButtonClick: () => void;
  children?: React.ReactNode;
  type?: 'edit' | 'delete' | 'complete' | 'undo' | 'save';
}

const Tbutton: React.FC<TbuttonProps> = ({ text, onButtonClick, type = 'edit' }) => {
  const baseStyle: React.CSSProperties = {
    padding: '8px 14px',
    borderRadius: '8px',
    fontSize: '24px',
    marginLeft: '6px',
    border: 'none',
    cursor: 'pointer',
    fontWeight: 'bold',
    width: '400px',
    height: '50px'
  };

  const typeStyles: { [key: string]: React.CSSProperties } = {
    save: { backgroundColor: '#ffd54f' },
    edit: { backgroundColor: '#64b5f6', color: 'white' },
    complete: { backgroundColor: '#81c784', color: 'white' },
    undo: { backgroundColor: '#4db6ac', color: 'white' },
    delete: { backgroundColor: '#e57373', color: 'white' },
  };

  const combinedStyle = { ...baseStyle, ...typeStyles[type] };

  return (
    <button style={combinedStyle} onClick={onButtonClick}>
      {text}
    </button>
  );
};

export default Tbutton;