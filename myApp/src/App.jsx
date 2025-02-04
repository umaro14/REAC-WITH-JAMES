
import { Header } from "./components/Header"
//import { Tabs } from "react-bootstrap"
import { TodoList } from "./components/TodoList"
import { ToDoInput } from "./components/TodoInput"
import { Tabs } from "./components/Tabs"



function App() {
  
  const todos = [
    { input: 'Hello! Add your first todo!', complete: true },
    { input: 'Get the groceries!', complete: false },
    { input: 'Learn how to web design', complete: false },
    { input: 'Say hi to gran gran', complete: true },
    { input: 'Make a todo list', complete: false },
  ]

  return (

    <>
      <Header todos={todos}/>
      <Tabs todos={todos}/>
      <TodoList todos={todos}/>
      <ToDoInput />
    </>
  )
    
  
}

export default App
