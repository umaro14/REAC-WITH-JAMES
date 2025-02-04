
export function Header(props){

    //destructuring 
    const { todos } = props;
    const todoslength = todos.length;

    const isTaskPlural = todos.length != 1;

    const taskOrTaks  = isTaskPlural ? 'tasks' : 'task';

    return (
        <header>
          <h1 className="text-gradient">You have a {todoslength} open {taskOrTaks} </h1>
        </header>
    )
}