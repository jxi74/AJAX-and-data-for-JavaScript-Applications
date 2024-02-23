
async function user() {

    for (let i = 0; i < 24; i++) {
        let response = await fetch("https://randomuser.me/api/");

        let data = await response.json();
        createUser(data, i);
    }
}

user().catch();

function createUser(r, j) {
    //console.log(r);

    // Assign every attribute in json file to a variable
    let i = 0;
    let col = document.createElement("div"); // Create new div to hold people
    col.className = "col-lg-2 col-sm-6 col-md-3"; // changes how many divs on screen depending on screen size\
    let modl = document.createElement("modal");

    let gender = r.results[i].gender;

    let title = r.results[i].name.title;
    let first = r.results[i].name.first;
    let last = r.results[i].name.last;

    let cell = r.results[i].cell;
    let email = r.results[i].email;
    let login = r.results[i].login;
    let dob = r.results[i].dob.date.split("T")[0];
    let age = r.results[i].dob.age;
    let registered = r.results[i].registered.date.split("T")[0]; //[0] to get rid of rest
    let phone = r.results[i].phone;
    let id = r.results[i].id;
    let picture = r.results[i].picture.large;
    let picture2 = r.results[i].picture.medium;
    let nat = r.results[i].nat;

    let username = r.results[i].login.username;
    let password = r.results[i].login.password;

    let city = r.results[i].location.city;
    let state = r.results[i].location.state;
    let country = r.results[i].location.country;
    let postcode = r.results[i].location.postcode;

    let street_number = r.results[i].location.street.number;
    let street_name = r.results[i].location.street.name;


    col.innerHTML = `
        <div class = "card mt-5" data-bs-toggle="modal" data-bs-target="#userModal`+j+`"> 
            <div class="card-header text-md-center bg-white" style="user-select: none;">
                <h5 class="card-title">${city}, ${state}</h5>
            </div>
            <img src=${picture} class="card-img" alt="user" style="background-color: lightgrey; border-radius: 50%;">
            <div class="card-body text-center bg-white" style="user-select: none;">
                <h5>${first} ${last}</h5>
                <p>${first} ${last} lives on ${street_number}, ${street_name} and registered on ${registered}</p>
            </div>
        </div>
    `

    // appends card
    document.getElementById("row").appendChild(col);

    // Creates each modal
    modl.innerHTML = `
    <div class="modal fade" id="userModal`+j+`" tabindex="-1" aria-labelledby="userModalLabel" aria-hidden="true">
        <div class="modal-dialog">
            <div class="modal-content">
                <div class="modal-header">
                    <button type="button" class="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
                </div>
                <div class="modal-body">
                    <h5>Full Name: ${title} ${first} ${last}</h5>
                    <h5>Age: ${age}</h5>
                    <h5>Gender: ${gender}</h5>
                    <h5>Date of Birth: ${dob}</h5>
                    <h5>Date Registered: ${registered}</h5>
                    <p></p>
                    
                    <h5>Address: ${street_number} ${street_name},</h5>
                    <h5>${city} ${state}, ${postcode}</h5>
                    <h5>${country}</h5>
                    
                    <p></p>
                    <h5>Phone: ${phone}</h5>
                    <h5>Email: ${email}</h5>
                    <h5>Username: ${username}</h5>
                    <h5>Password: ${password}</h5>               
                </div>
            </div>
        </div>
    </div>
    `

    //console.log(modl);
    // appends modal
    document.getElementById("body").appendChild(modl);
}

// Filter feature
$("#search").on("keyup", function() {
    let value = $(this).val().toLowerCase();
    $("#row > div").filter(function() { // Selects every div inside row and use .filter to filter
        $(this).toggle($(this).text().toLowerCase().indexOf(value) > -1) // Toggle sets display to none or block
    });                                                                        // If it doesn't match = none
});                                                                            // If it does match = block

