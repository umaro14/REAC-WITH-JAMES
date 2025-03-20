import { useEffect, useState } from "react";
import {getFullPokedexNumber, getPokedexNumber}  from "../utils";
import { TypeCard } from "./TypeCard";
import { Modal } from "./Modal";

export function PokeCard(props){
    const { selectedPokemon } = props;
    const [data, setData] = useState(null);        //when fetching data is good to set it to null as the default value
    const [loading, setLoading] = useState(false); 
    const [skill, setSkill] = useState(null);
    const [loadingSkill, setLoadingSkill] = useState(false);
    
    //if data is null then destructure out of this empty object
    //because we cant destructure out of a null data
    const {name, height, abilities, stats, types,moves, sprites} = data || {};

    const imgList = Object.keys(sprites || {}).filter(val => {
        if(!sprites[val]) {return false}
        if(['version', 'other'].includes(val)) {return false}
        return true;
    })


    async function fetchMoveData(move, moveUrl) {
        if(loading || !localStorage || !moveUrl) {return}

        //check cache for move
        let c = {}
        if (localStorage.getItem("pokemon-moves")){
            c = JSON.parse(localStorage.getItem("pokemon-moves"))
        }
        //IF THE MOVE IS IN THE CACHE THEN WE GET IT FROM THERE
        if(move in c){
            setSkill(c[move])
            console.log("Found move in cache")
            return
        } //IF THYE MOVE IS NOT IN THE CACHE THEN WE FETCH IT FROM THE API
        try {
            setLoadingSkill(true)
            const res = await fetch(moveUrl);
            const moveData = await res.json();
            console.log( "Fetched move from API", moveData);
            const description = moveData?.flavor_text_entries.filter(val => {
                return val.version_group.name = "firered-leafgreen"
            })[0]?.flavor_text
            const skillData = {
                name: move,
                description: description,
            }
            setSkill(skillData);
            c[move] = skillData;
            localStorage.setItem("pokemon-moves", JSON.stringify(c))
        } catch (err) {
            console.log(err)
        }
        finally{
            setLoadingSkill(false)
        }
    }

    useEffect(() => {
        // if loading, exit logic
        if(loading || !localStorage) { return };
         // 1. define the cach
         let cache = {};         
          // check if the selected info is available in the cache                     
         if(localStorage.getItem("pokedex")){                      
            cache  = JSON.parse(localStorage.getItem("pokedex"))   //PARSE => json to object
         }
        

        // 2. check if the selected pokemon is in the cache,otherwise fetch from the API
        if(selectedPokemon in cache){
            // read from cache
            setData(cache[selectedPokemon]) //update the state
            console.log("Found pokemon in cache")
            return;
        } 

        //we passed all the cache stuff to no avail and now weneed to fetch the data from the API
        async function fetchPokemonData(){
            setLoading(true);
            try {
                const baseUrl = "https://pokeapi.co/api/v2/";
                const suffix = "pokemon/" + getPokedexNumber(selectedPokemon);
                const finalUrl = baseUrl + suffix;
                const res = await fetch(finalUrl);
                const pokemonData = await res.json();
                setData(pokemonData);
                console.log("Fetch pokemon data");

                cache[selectedPokemon] = pokemonData;
                localStorage.setItem("pokedex", JSON.stringify(cache));

            } catch (err) {
                console.log("errosrrr", err.message); 
            } finally {
              setLoading(false);
            }
        }

        fetchPokemonData();


        // if we fetch from the API make sure we save the info to the cache for next time
    }, [selectedPokemon]) // function will run whenever the state of the selectedPokemon changes 

    //if data does exixte or loading then return this...
    if(loading || !data) {
        return (
            <div>
               <h4>Loading...</h4>;
            </div>
        );
    }

    //if is not loading and the data exits then return this...
    //if skill is true render this model otherwise do not render this out
    return (
        <div className="poke-card">
            {skill && (
                <Modal handleCloseModwel={() => { setSkill(null) }}>
                    <div>
                        <h6>Name</h6>
                        <h2 className="skill-name">{skill.name.replaceAll("_", " ")}</h2>
                    </div>
                    <div>
                        <h6>Description</h6>
                        <p>{skill.description}</p>
                    </div>
                </Modal>
           )}
            
            <div>
                <h4>#{getPokedexNumber(selectedPokemon)}</h4>
                <h2>{name}</h2>
            </div>
            <div className="type-container">
                {types.map((typeObj, index) => {
                    return (
                        //we are using ? if we are not sure the object exists
                        <TypeCard key={index} index={index} type={typeObj?.type?.name} />
                    )
                })}
            </div>
            <img className="default-img" src={'/pokemon/' + getFullPokedexNumber(selectedPokemon) + '.png'} alt={`${name}-large-img`}/>
            <div className="img-container">
               {imgList.map((spriteUrl, spriteIndex) => {
                const imgUrl = sprites[spriteUrl];
                return (
                    <img key={spriteIndex} src={imgUrl} alt={`${name}-img-${spriteUrl}`} />
                )
               })}
            </div>
            <h3>Stats</h3>
            <div className="stats-card">
              {stats.map((statObj, statsIndex) =>{
                const {stat, base_stat} = statObj
                return (
                    <div key={statsIndex} className="stat-item">
                      <p>{stat?.name.replaceAll("-", " ")}</p>
                      <h4>{base_stat}</h4>
                    </div>
                )
              })}
            </div>
            <h3>Moves</h3>
            <div className="pokemon-move-grid">
                {moves.sort((a, b) => a.move.name.localeCompare(b.move.name)).map((moveObj, moveIndex) =>{
                    return (
                        <button className="button-card pokemon-move" key={moveIndex} onClick={() =>{ 
                            fetchMoveData(moveObj?.move?.name, moveObj?.move.url)}}>
                            <p>{moveObj?.move?.name.replaceAll("-", " ")}</p>
                        </button>
                    )
                })}
            </div>
        </div>
    )
}