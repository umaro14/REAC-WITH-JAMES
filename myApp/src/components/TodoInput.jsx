import { useState } from "react";

export function ToDoInput(props){
    const { handleAddTodo } = props;

    const [inputValue, setInputValue] = useState("");
  


    return (
        <div className="input-container">
            <input placeholder="Add task" 
                value={inputValue} onChange={(e) =>{  //this fucntion will run every time the input value changes
                setInputValue(e.target.value);
            }} />
            <button onClick={() => {
                if(!inputValue) return;    //if we do not have value(empty string) in the input just return. the next line won't run
                handleAddTodo(inputValue);
                setInputValue(""); // clear the value of the input affter adding
            }}>
                <i className="fa-solid fa-plus"></i>
            </button>
        </div>
    )
}