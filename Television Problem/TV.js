
// Adds event listener if user presses enter button or clicks search button, it will then search for shows
document.getElementById("body").addEventListener("keypress", function(event) {
   if (event.key === "Enter")
       searchButton();
});
document.getElementById("searchBtn").addEventListener("click", searchButton)


let j = 0;
async function show() {
    // Takes whatever the user typed in the input field and changes the api call based on it
    let inp = document.getElementById("usrInput").value;

    let response = await fetch("https://api.tvmaze.com/search/shows?q="+ inp);

    return await response.json();
}

async function episodes(episode_link) {
    // Gets list of episodes for a specific TV show you click on
    let response = await fetch(episode_link + "/episodes");

    return await response.json();
}

function searchButton() {
    show().then(r => {
        console.log(r);
        $("#row").empty(); // After you search, it will remove the currently shown shows if there are any
        for (let i = 0; i < r.length; i++) {
            let col = document.createElement("div"); // Create new div to hold TV Shows
            col.className = "col-lg-2 col-sm-6 col-md-3 d-flex align-items-stretch"; // Changes how many divs on screen depending on screen size
            let modl = document.createElement("modal"); // Pop up when you click on card

            // Assign every attribute in json file to a variable
            let name = r[i].show.name;
            let image = r[i].show.image===null ? "missing.png" : r[i].show.image.original; // Short handed if statement if no image is found
            let genres = r[i].show.genres;
            let language = r[i].show.language;

            let network = r[i].show.network===null ? "None" : r[i].show.network.name; //If null set to None, else normal query
            let premiered = r[i].show.premiered;

            let rating = r[i].show.rating.average===null ? "N/A" : r[i].show.rating.average;
            let runtime = r[i].show.runtime===null ? "N/A" : r[i].show.runtime;
            let summary = r[i].show.summary;
            let type = r[i].show.type;
            let episode_link = r[i].show._links.self.href;

            genres = genres.join(", ");

            // Card with TV show on it
            col.innerHTML = `
            <div class = "card mt-5 bg-dark" data-bs-toggle="modal" data-bs-target="#tvModal`+j+`"> 
                <div class="card-header text-md-center" style="user-select: none;">
                    <img src=${image} class="card-img" alt="show">
                </div>
                <div class="card-body text-center" style="user-select: none;">
                    <h5 class="card-title" style="color: white">${name}</h5>
                </div>
            </div>
            `

            // appends card to div container
            document.getElementById("row").appendChild(col);


            // Creates each modal
            modl.innerHTML = `
        <div class="modal fade" id="tvModal`+j+`" tabindex="-1" aria-labelledby="tvModalLabel" aria-hidden="true">
            <div class="modal-dialog">
                <div class="modal-content bg-dark">
                    <div class="modal-header">
                        <button type="button" class="btn-close bg-white" data-bs-dismiss="modal" aria-label="Close"></button>
                    </div>
                    <div class="modal-body" id="myModal`+j+`" style="color: white">
                        <div class="row">
                            <div class="col-md-4">
                                <img src=${image} class="img-fluid mb-3" alt="show" style="max-height:180px; max-width:122px;
                                                                                                   border-radius: 5px;">
                                <h5>${name}</h5>
                                <h5>Premiered ${premiered}</h5>
                                <h5>${language}</h5>
                                <h5>Network: ${network}</h5>
                                <h5>Rating: ${rating} / 10</h5>
                                <h5>Runtime:</h5>
                                <h5>${runtime} minutes</h5>
                                <p></p>
                            </div>
                            <div class="col-md-8">
                                <h5>${summary}</h5>
                                <p></p>
                            </div>
                        </div>     
                    </div>
                </div>
            </div>
        </div>
        `

            //console.log(modl);
            // appends modal to body container
            document.getElementById("body").appendChild(modl);

            let m = document.getElementById("myModal"+j);
            console.log(m);

            // Lists each episode in modal
            episodes(episode_link).then(res => {
                console.log(res)
                let g = document.createElement("ul");
                g.className="list-group";
                for (let p = 0; p < res.length; p++) {
                    let name = res[p].name;
                    let number = res[p].number;
                    let season = res[p].season;
                    let date = res[p].airdate;
                    let summary = res[p].summary;

                    let h = document.createElement("li");
                    h.className="list-group-item"

                    h.innerText = `Season ${season}, Episode ${number}: ${name}`;
                    g.appendChild(h);

                }
                // Appends episodes modal to screen
                m.appendChild(g);



            }).catch(err => {
                console.log(err);
            })


            j++;

        }


    }).catch(err => {
        console.log(err);
    })
}
