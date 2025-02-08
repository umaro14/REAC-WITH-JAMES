
export function TodoCard(props){

    const { todo, handleDeleteTodo, todoIndex, handleCompleteTodo } = props; //receiving an sinle todo, not an array of todos, that is why (todo) not todos
    

    return (
        <div className="card todo-item">
            <p>{todo.input}</p>
            <div className="todo-buttons">
               <button onClick={() =>{
                    handleCompleteTodo(todoIndex);
               }}
               disabled={todo.complete==true}> {/*if todo.complete == true then disable the Done button*/}
                    <h6>Done</h6>
               </button>
               <button onClick={() => {
                    handleDeleteTodo(todoIndex); //passing the index of the todo to the handleDeleteTodo
               }}>
                    <h6>Delete</h6>
               </button>
            </div>
        </div>
    )
}
