
import { useState } from "react";
import { first151Pokemon, getFullPokedexNumber } from "../utils"

export function Sidenav(props) { 
  const { selectedPokemon, setSelectedPokemon, handleClaseMenu, showSideMenu } = props;

  const [ searchValue, setSearchValue] = useState("");

  const filteredPokemon = first151Pokemon.filter((ele, eleIndex) =>{
    // if the full pokedex number includes the current search value, then return true
    if((getFullPokedexNumber(eleIndex)).includes(searchValue)) { return true }

    // if the fullpokedex name inclues the current search value, then return true
    if(ele.toLowerCase().includes(searchValue.toLowerCase())) { return true }

    // otherwise, exclude value from the array
    return false;
  })

  return (
    <nav className={" " + (!showSideMenu ? " open" : "")}> 
      <div className={"header" + (!showSideMenu ? " open" : "")}>
        <button className="open-nav-button" onClick={handleClaseMenu}>
           <i className="fa-solid fa-arrow-left-long"></i>
        </button>
        <h1 className="text-gradient">Pokedex</h1>
      </div>
      <input placeholder="e.g 001 or Bulb..." value={searchValue} onChange={(e) => {
        setSearchValue(e.target.value)
      }}/>

      {filteredPokemon.map((pokemon, pokemonIndex) => {
        const truePokedexNumber = first151Pokemon.indexOf(pokemon)
        return(
            <button key={pokemonIndex} className={"nav-card" + (pokemonIndex === selectedPokemon ? " nav-card-selected" : " ")}
              onClick={() => {
                setSelectedPokemon(truePokedexNumber) 
                handleClaseMenu()
              }}
            >
                <p>{getFullPokedexNumber(truePokedexNumber)}</p>
                <p>{pokemon}</p>
            </button>
        )
      })}
    </nav>
  )
}

