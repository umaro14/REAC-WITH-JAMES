
import { Header } from "./components/Header"
import { TodoList } from "./components/TodoList"
import { ToDoInput } from "./components/TodoInput"
import { Tabs } from "./components/Tabs"

import { useState, useEffect } from "react"



function App() {

  //HOOK
  const [todos, setTodos] = useState([
    { input: 'Hello! Add your first todo!', complete: false }  //default todo
  ]);

  const [selectedTab, setSelectedTab] = useState("All");



  //we cannot modify the existing todo list and add the new todo, this does not work in react
  //the origin state variable we defined in the line above (todos useState) are immutable, we wuld have to duplicate it
  //then override it, that's why we use the spread operator for the original todos
  function handleAddTodo(newTodo){
    const newTodoList = [...todos, {input: newTodo, complete: false}];  //this object is the full new todo
    setTodos(newTodoList);
    handleSaveData(newTodoList); //saves it to the local storage
  };

  //update/edit/modify
  function handleCompleteTodo(index){
    let newTodoList = [...todos];       //duplicate my todos
    let completedTodo = todos[index];   //represnet a todo using the index
    completedTodo["complete"] = true;   //sets the complete filed to true
    newTodoList[index] = completedTodo; //overrides the previous todo with the new completedTodo
    setTodos(newTodoList);              //now we re-assign the state of our setTodos
    handleSaveData(newTodoList); 
  };


  //delete
  function handleDeleteTodo(index){
    let newTodoList = todos.filter((val, valIndex) => {
      return valIndex !== index // kepp it else delete
    });
    setTodos(newTodoList)
    handleSaveData(newTodoList);
  };

  function handleSaveData(currentTodo) {
    localStorage.setItem("todo-app", JSON.stringify({ todos: currentTodo }));
  }

  useEffect(() => {
   if(!localStorage || !localStorage.getItem("todo-app")) {return};     //if todo-todo app exist  //unique under all of our info is saved...this is called guard clause
   let db = JSON.parse(localStorage.getItem("todo-app"));
   setTodos(db.todos);
  }, []);



  return (

    <>
      <Header todos={todos}/>
      <Tabs selectedTab={selectedTab} setSelectedTab={setSelectedTab} todos={todos}/>
      <TodoList 
      handleCompleteTodo={handleCompleteTodo}
      handleDeleteTodo={handleDeleteTodo} 
      selectedTab={selectedTab} 
      todos={todos}
      />
      <ToDoInput handleAddTodo={handleAddTodo}/>
    </>
  )
    
  
}

export default App
