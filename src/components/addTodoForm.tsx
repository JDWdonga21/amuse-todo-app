import React, {useState} from "react";
import { useSetRecoilState } from "recoil";
import { todoListState, TodoItemType } from "../atoms/todoListAtom";
import { v4 as uuidv4 } from 'uuid';
import Tbutton from "../components/todoButton";

const AddTodoForm = () => {
    const[text, setText] = useState('');
    const[priority, setPriority] = useState<'low'|'medium'|'high'>('medium');
    const setTodoList = useSetRecoilState(todoListState);


    
    const handleAdd = () => {
        if(!text.trim()) return;

        const newTodo: TodoItemType = {
            id: uuidv4(),
            text,
            completed: false,
            priority,
            createdAt: new Date().toISOString(),
        };

        setTodoList((oldList) => [...oldList, newTodo]);
        setText('');
    };

    return(
        <div>
            <input
                type="text"
                placeholder="할 일을 입력하세요."
                value={text}
                onChange={(e)=>{
                    setText(e.target.value)
                }}
            />
            <select 
                value={priority} 
                onChange={(e)=>{
                        setPriority(e.target.value as any)
                    }
                }
            >
                <option value="high">높음</option>
                <option value="medium">중간</option>
                <option value="low">낮음</option>
            </select>
            <Tbutton
                text="추가가"
                onButtonClick={
                    ()=>{
                        handleAdd();
                    }
                }
            >

            </Tbutton>
        </div>
    );
};
export default AddTodoForm;