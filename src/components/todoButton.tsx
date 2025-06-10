import React from "react";

interface TbuttonProps {
    text: string;
    // displayYn: boolean;
    onButtonClick: () => void;
    children?: React.ReactNode; 
}

const Tbutton: React.FC<TbuttonProps> = ({ text, onButtonClick }) => {
    return (
        <button
            style={{
                width: '200px',
                height: '45px',
                fontSize: '20px',
                cursor: "pointer"
            }}
            onClick={onButtonClick}
        >
            {text}
        </button>
    );
}

export default Tbutton;
