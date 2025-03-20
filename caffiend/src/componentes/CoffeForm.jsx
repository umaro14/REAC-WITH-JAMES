
import { useState } from "react"
import { coffeeOptions } from "../utils" 


export default function CoffeeForm(){
    const [selectedCoffee, setSelectedCoffee] = useState(null);
    const [showCoffeeTypes, setShowCoffeeTypes] = useState(false);
    const [coffeeCost, setCofeeCost] = useState(0);
    const [hour, setHour] = useState(0);
    const [min, setMin] = useState(0);

    function handleSubmitForm(){
        console.log(selectedCoffee, coffeeCost, hour, min);
    };


    return(
        <>
          <div className="section-header">
            <i className="fa-solid fa-pencil" />
            <h2>Start Tracking Today</h2>
          </div>
          <h4>Select Coffee type</h4>
          <div className="coffee-grid">
            {coffeeOptions.slice(0, 5).map((option, optionIndex) => {
                return (
                    <button key={optionIndex} onClick={() => {
                        setSelectedCoffee(option.name)
                        setShowCoffeeTypes(false)
                    }}
                    className={"button-card " + (option.name === selectedCoffee ? "coffee-button-selected" : "")} 
                    >
                      <h4>{option.name}</h4>
                      <p>{option.caffeine} mg</p>
                    </button>
                )
            })}
            <button onClick={() => {
                 setShowCoffeeTypes(true)
                 setSelectedCoffee(null); {/*this resets the border for the primary 5 types */}
                 }}
                 className={"button-card " + (showCoffeeTypes ? "coffee-button-selected" : "")}>
                 <h4>Other</h4>
                 <p>n/a</p>
            </button>
          </div>
          {/*only displays the list of the coffee types if showCoffee is true, which is true only when the "other" button is clicked*/}
          {showCoffeeTypes && (
             <select id="coffee-list" name="coffee-list" onChange={(e) => {
                setSelectedCoffee(e.target.value)
             }}>
             <option value={null}>Select type</option>
             {coffeeOptions.map((option, optionIndex) =>{
             return (
                <option value={option.name} key={optionIndex}>
                {option.name} ({option.caffeine}mg)
                </option>
              )
             })}
           </select>
         )}
          <h4>Add the cost ($)</h4>
          <input className="w-full" type="number" value={coffeeCost} placeholder="4.50" min={0} onChange={(e) => {
            setCofeeCost(e.target.value)
          }}/>
          <h4>Time since consumption</h4>
          <div className="time-entry">
            <div>
               <h6>Hours</h6>
               <select id="hours-select" onChange={(e) => {
                setHour(e.target.value)
               }}>
                  //custom array, it does not exist anywhere
                 {[0,1,2,3,4,5,6,7,8,9,10,11,12,13,14,15,16,17,18,19,20,21,22,23].map((hour, hourIndex) => {
                    return (
                        <option key={hourIndex} value={hour}>{hour}</option>
                    )
                 })}
               </select>
            </div>
            <div>
               <h6>Mins</h6>
               <select id="mins-select" onChange={(e) => {
                setMin(e.target.value)
               }}>
                  //custom array, it does not exist anywhere
                 {[0,5,10,15,30,45].map((min, minIndex) => {
                    return (
                        <option key={minIndex} value={min}>{min}</option>
                    )
                 })}
               </select>
            </div>
          </div>
          <button onClick={handleSubmitForm}>Add Entry</button>
        </>
    )
}