import { TodoCard } from "./TodoCard";

export function TodoList(props){

  const { todos, selectedTab, } = props;  //coming from App so todos can be accessed here


    const filteredTodos = selectedTab === "All" ?
    todos :                                  // if selectedTab === all then filteredTODOS = todos
    selectedTab === "Completed" ?            // if selectedTab === completed then filteredTODOS = completed todos
    todos.filter(val => val.complete) :      
    todos.filter(val => !val.complete);      // if selectedTab === !completed which is false then filteredTODOS = uncompleted todos

    return (
        <>
          {
            filteredTodos.map((todo, todoIndex) => {
              return(
                <TodoCard 
                key={todoIndex} 
                todoIndex={todos.findIndex(val =>val.input == todo.input)}
                {...props} //whatevr the props of the todoListpass willbe passed wown to the props here
                todo={todo} />
              )
            })
          }
        </> 
    )
}