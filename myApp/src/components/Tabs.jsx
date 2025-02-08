
export function Tabs(props){

    const { todos, selectedTab, setSelectedTab } = props; //coming from App so todos can be accessed here

    const tabs = ['All', 'Open', 'Completed']

    return (
        <nav className="tab-container">

         {
            tabs.map((tab, tabIndex) => {

                const numOfTasks = tab === 'All' ?   todos.length :   // Count all tasks.//gives the total number of tasks.              
                                   tab === 'Open' ?                   //Count tasks that are incomplete.
                                   todos.filter(val => !val.complete).length :   //count only false(iicomplete) ones
                                   todos.filter(val => val.complete).length      //Count tasks that are complete.

                return(
                    <button onClick={() =>{
                        setSelectedTab(tab);
                    }}
                    key={tabIndex} 
                    className={"tab-button " + 
                    (tab === selectedTab ? ' tab-selected' : '')} >
                        <h4>
                            {tab} <span>({numOfTasks})</span>
                        </h4>
                    </button>
                )
            } )
        }
        <hr />
        </nav>
    )
}