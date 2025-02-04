
export function TodoCard(props){

    const { todo } = props;
    

    return (
        <div className="card todo-item">
            <p>{todo.input}</p>
            <div className="todo-buttons">
               <button disabled={todo.complete==true}> {/*if todo.complete == true then disable the Done button*/}
                    <h6>Done</h6>
               </button>
               <button>
                    <h6>Delete</h6>
               </button>
            </div>
        </div>
    )
}
