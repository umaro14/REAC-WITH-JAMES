import { calculateCurrentCaffeineLevel, coffeeConsumptionHistory, statusLevels, calculateCoffeeStats, getTopThreeCoffees } from "../utils"

//to be used only within this component
function StatCard(props){
    const {lg, title, children} = props
    return (
        <div className={'card stat-card' + (lg ? ' col-span-2' : ' ') }>
          <h4>{title}</h4>
          {children}
        </div>
    )
}


export default function Stats(){
    const stats = calculateCoffeeStats(coffeeConsumptionHistory)
    //function from ../utils
    const caffeineLevel = calculateCurrentCaffeineLevel(coffeeConsumptionHistory);
    //coffee levels
    const warningLevel = caffeineLevel < statusLevels["low"].maxLevel ? 'low' : 
    caffeineLevel < statusLevels['moderate'].maxLevel ? 'moderate' : 'high';


    return(
        <>
           <div className="section-header"> 
             <i className="fa-solid fa-chart-simple"></i>
             <h2>Stats</h2>
           </div>
           <div className="stats-grid">
             <StatCard lg={'lg'} title="Active Caffeine Level"> {/*This one will span 2 columns, bucause it is a lg*/}
               <div className="status">
                 <p><span className="stat-text">{caffeineLevel}</span>mg</p>
                 <h5 style={{color: statusLevels[warningLevel].color, background: statusLevels['low'].background}}>Low</h5>
               </div>
               <p>{statusLevels[warningLevel].description}</p>
             </StatCard> 

             <StatCard title="Daily Caffeine">
               <p><span className="stat-text">{stats.daily_caffeine}</span>mg</p>
             </StatCard>

             <StatCard title="Avg # of Coffees">
               <p><span className="stat-text">{stats.average_coffees}</span></p>
             </StatCard>

             <StatCard title="Daily Cost ($)">
               <p>$<span className="stat-text">{stats.daily_cost}</span></p>
             </StatCard>

             <StatCard title="Total Cost ($)">
               <p>$<span className="stat-text">{stats.total_cost}</span></p>
             </StatCard>
             <table className="stat-table">
               <thead> 
                 <tr>
                   <th>Coffe Name</th>
                   <th>Number of Purchase</th>
                   <th>Percentage of Total</th>
                 </tr>
               </thead>
               <tbody>
                 {getTopThreeCoffees(coffeeConsumptionHistory).map((coffee, coffeeIndex) => {
                    return(
                        <tr key={coffeeIndex}>
                          <td>{coffee.coffeeName}</td>
                          <td>{coffee.count}</td>
                          <td>{coffee.percentage}</td>
                        </tr>
                    )
                 })}
               </tbody>
             </table>
           </div>
        </>
    )
}