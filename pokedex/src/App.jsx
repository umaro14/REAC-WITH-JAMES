import { Header } from "./components/header"
import { PokeCard } from "./components/PokeCard"
import { Sidenav } from "./components/Sidenav"

import { useState } from "react"


function App() {
  const [selectedPokemon, setSelectedPokemon] = useState(0);
  const [showSideMenu, setShowSideMenu] = useState(true);

  function handleToggleMenu (){
    setShowSideMenu(!showSideMenu)
  }

  function handleClaseMenu(){
    setShowSideMenu(true);
  }

  return (
    <>
      <Header handleToggleMenu={handleToggleMenu} />
      <Sidenav 
       selectedPokemon={selectedPokemon} 
       setSelectedPokemon={setSelectedPokemon}
       handleClaseMenu={handleClaseMenu} 
       showSideMenu={showSideMenu} />
      <PokeCard selectedPokemon={selectedPokemon} />
    </>
  )
}

export default App
