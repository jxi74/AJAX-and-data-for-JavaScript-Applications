/* poke does promise
.then response calls url, gets the data, and puts it off on the side until it needs it
The program will then run the rest of the js file
 */
async function poke() { // promise

    let response = await fetch("https://raw.githubusercontent.com/Biuni/PokemonGO-Pokedex/master/pokedex.json");

    return await response.json();
}

// r = response
poke().then(r => {
    console.log(r); //Prints data from url in console
    // Put in class name the margins and stuff
    // Loops through the pokemon array in the json file
    for (let i = 0; i < r.pokemon.length; i++) {
        let col = document.createElement("div"); // Create new div to hold pokemon
        col.className = "col-lg-2 col-sm-6 col-md-3"; // Changes how many divs on screen depending on screen size
        let modl = document.createElement("modal"); // Pop up when you click on card

        // !! ${var} to put variable in html !!
        // Assign every attribute in json file to a variable
        let num = r.pokemon[i].num;
        let name = r.pokemon[i].name;
        let image = r.pokemon[i].img;

        let avg_spawns = r.pokemon[i].avg_spawns;
        let candy = r.pokemon[i].candy;
        let candy_count = r.pokemon[i].candy_count;
        let egg = r.pokemon[i].egg;
        let height = r.pokemon[i].height;
        let id = r.pokemon[i].id;
        let multipliers = r.pokemon[i].multipliers;
        let next_evolution = r.pokemon[i].next_evolution;
        let spawn_chance = r.pokemon[i].spawn_chance;
        let spawn_time = r.pokemon[i].spawn_time;
        let type = r.pokemon[i].type;
        let weaknesses = r.pokemon[i].weaknesses;
        let weight = r.pokemon[i].weight;

        // Checks to make sure if certain attributes don't exist or if there are multiple elements for an attribute,
        // then either set it to None or map out the multiple elements and join them together with a comma
        if (candy_count === undefined)
             candy_count = "None";

        if (next_evolution === undefined)
            next_evolution = "None";
        else
            next_evolution = next_evolution.map(a => a.name).join(", ");

        if (multipliers === null)
            multipliers = "None";
        else
            multipliers = multipliers.join(", ");

        if (type === undefined)
            type = "None";
        else
            type = type.join(", ");

        if (weaknesses === undefined)
            weaknesses = "None";
        else
            weaknesses = weaknesses.join(", ");


        //innerHTML allows us to put html in js file (easier to write div)
        // Put "+i+" to make id unique (adds num after)
        // Creates each card
        col.innerHTML = `
        <div class = "card mt-5" data-bs-toggle="modal" data-bs-target="#pokeModal`+i+`"> 
            <div class="card-header text-md-center bg-white">
                <h5 class="card-title">${name}</h5>
            </div>
            <img src=${image} class="card-img" alt="poke" style="background-color: lightgrey;">
            <div class="card-footer text-center bg-white">
                <h5 class="card-title">#${num}</h5>
                <h6 class="card-body">${type}</h6>
            </div>
        </div>
        `

        // appends new card to div container
        document.getElementById("row").appendChild(col);

        // Creates each modal
        modl.innerHTML = `
        <div class="modal fade" id="pokeModal`+i+`" tabindex="-1" aria-labelledby="pokeModalLabel" aria-hidden="true">
            <div class="modal-dialog">
                <div class="modal-content">
                    <div class="modal-header">
                        <button type="button" class="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
                    </div>
                    <div class="modal-header">
                        <h1 class="modal-title fs-5" id="pokeModalLabel">${name} #${num}</h1>
                        <img src=${image} class="card-img" alt="poke">
                    </div>
                    <div class="modal-body text-md-center">
                        <h5>Type: ${type}</h5>
                        <h5>Weaknesses: ${weaknesses}</h5>
                        <h5>Next Evolution(s): ${next_evolution}</h5>
                        <h5>Height: ${height}</h5>
                        <h5>Weight: ${weight}</h5>
                        <h5>Multiplier(s): ${multipliers}</h5>
                        <h5>Egg Size: ${egg}</h5>
                        <h5>Candy: ${candy}</h5>
                        <h5>Candy Count: ${candy_count}</h5>
                        <h5>Average Spawns: ${avg_spawns}</h5>
                        <h5>Spawn Chance: ${spawn_chance}%</h5>
                        <h5>Spawn Time: ${spawn_time}</h5>                   
                    </div>
                </div>
            </div>
        </div>
        `

        // appends modal
        document.getElementById("body").appendChild(modl);

    }

    // breb
    let col = document.createElement("div");
    col.className = "col-lg-2 col-sm-6 col-md-3";
    let modl = document.createElement("modal");

    col.innerHTML = `
        <div class="card mt-5" data-bs-toggle="modal" data-bs-target="#pokeModal300">
            <div class="card-header text-md-center bg-white" style="width:74rem">
                <h5 class="card-title">Breb</h5>
            </div>
            <img src="breb.png" class="card-img" alt="breb" style="height:50rem; width:74rem">
            <div class="card-footer text-center bg-white" style="width:74rem">
                <h5 class="card-title">#152</h5>
            </div>
        </div>
        `

    document.getElementById("row").appendChild(col);

    // Creates each modal
    modl.innerHTML = `
        <div class="modal fade" id="pokeModal300" tabindex="-1" aria-labelledby="pokeModalLabel" aria-hidden="true">
            <div class="modal-dialog">
                <div class="modal-content">
                    <div class="modal-header">
                        <button type="button" class="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
                    </div>
                    <div class="modal-header">
                        <h1 class="modal-title fs-5" id="pokeModalLabel">Breb #152</h1>
                        <img src="breb.png" class="card-img" alt="poke" style="max-width: 300px; border-radius: 5px;">
                    </div>
                    <div class="modal-body text-md-center">
                        <h5>Type: Wheat</h5>
                        <h5>Weaknesses: Oven, Knife</h5>
                        <h5>Next Evolution(s): Toast</h5>
                        <h5>Height: 200m</h5>
                        <h5>Weight: 300kg</h5>
                        <h5>Multiplier(s): 1</h5>
                        <h5>Egg Size: No</h5>
                        <h5>Candy: Breb don't eat candy</h5>
                        <h5>Candy Count: No</h5>
                        <h5>Average Spawns: 1</h5>
                        <h5>Spawn Chance: 100%</h5>
                        <h5>Spawn Time: 06:00</h5>                   
                    </div>
                </div>
            </div>
        </div>
        `

    // appends modal
    document.getElementById("body").appendChild(modl);


}).catch(err => {
    console.log(err);
});



