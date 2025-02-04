
export function Tabs(props){

    const { todos } = props;

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
                    <button key={tabIndex} className="tab-button">
                        <h4>
                            {tab} <span>({numOfTasks})</span>
                        </h4>
                    </button>
                )
            } )
        }
          
        </nav>
    )
}