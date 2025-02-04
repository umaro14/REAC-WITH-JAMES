import { TodoCard } from "./TodoCard";

export function TodoList(props){

  const { todos } = props;


    const tab = 'Completed';
    const filteredTodos = tab === "All" ?
    todos :                                  //if tab === all then filteredTODOS = todos
    tab === "Completed" ?                    //if tab === completed then filteredTODOS = completed todos
    todos.filter(val => val.complete) :
    todos.filter(val => !val.complete);      //if tab === !completed which is fale then filteredTODOS = uncompleted todos

    return (
        <>
          {
            todos.map((todo, todoIndex) => {
              return(
                <TodoCard 
                key={todoIndex} 
                todoIndex={todoIndex} 
                todo={todo} />
              )
            })
          }
        </> 
    )
}