// load all phones
const loadPhones = async (searchText, dataLimit) => {
    const url = `https://openapi.programming-hero.com/api/phones?search=${searchText}`;
    const res = await fetch(url);
    const data = await res.json();
    displayLoadPhones(data.data, dataLimit);
};
// display all phones
const displayLoadPhones = (phones, dataLimit) => {
    const phonesContainer = document.getElementById("phones_container");
    phonesContainer.innerText = "";

    // 10 phones show
    const btnShowAll = document.getElementById("show_all");
    if (dataLimit && phones.length > 10) {
        phones = phones.slice(0, 10);
        btnShowAll.classList.remove("d-none");
    } else {
        btnShowAll.classList.add("d-none");
    }

    // no phone found message
    const noPhoneMessage = document.getElementById("no_phone_found_message");
    if (phones.length === 0) {
        noPhoneMessage.classList.remove("d-none");
    } else {
        noPhoneMessage.classList.add("d-none");
    }

    // display all phones
    phones.forEach((phone) => {
        const phonesDiv = document.createElement("div");
        phonesDiv.classList.add("col");
        phonesDiv.innerHTML = `
            <div class="card">
                <img src="${phone.image}" class="card-img-top p-3" alt="..." />
                <div class="card-body">
                    <h3 class="card-title">${phone.phone_name}</h3>
                    <h6 style="color: gray;">Brand: ${phone.brand}</h6>
                    <p class="card-text">This is a longer card with supporting text below as a natural lead-in to additional content. This content is a little bit longer.</p>
                    <button onclick="loadDetails('${phone.slug}')" class="btn btn-primary" data-bs-toggle="modal" data-bs-target="#exampleModal">Show Details</button>
                </div>
            </div>
        `;
        phonesContainer.appendChild(phonesDiv);
    });
    //loder end
    toggleSpinner(false);
};
const processSearch = (dataLimit) => {
    //loder start
    toggleSpinner(true);
    const inputField = document.getElementById("inputField");
    const searchText = inputField.value;
    loadPhones(searchText, dataLimit);
};
// search phones
document.getElementById("btnSearch").addEventListener("click", function () {
    processSearch(10);
});

// input search by click enter
document.getElementById("inputField").addEventListener("keypress", function (e) {
    if (e.key === "Enter") {
        processSearch(10);
    }
});

// toggleSpinner
const toggleSpinner = (isLoading) => {
    const loader = document.getElementById("load_spinner");
    if (isLoading) {
        loader.classList.remove("d-none");
    } else {
        loader.classList.add("d-none");
    }
};
// btn clicked by show all
document.getElementById("btn_show_all").addEventListener("click", function () {
    processSearch();
});

// load phone details
const loadDetails = async (id) => {
    const url = `https://openapi.programming-hero.com/api/phone/${id}`;
    const res = await fetch(url);
    const data = await res.json();
    displayDetails(data.data);
};

// show phone details
const displayDetails = (phone) => {
    const phoneTitle = document.getElementById("exampleModalLabel");
    phoneTitle.innerText = phone.name;
    const phoneDetails = document.getElementById("phone_details");
    phoneDetails.innerHTML = `
        <ul>
            <li class="pb-2"><b>Release Date:</b> ${phone.releaseDate ? phone.releaseDate : "No Release Date Found!"}</li>
            <li class="pb-2"><b>Chip Set:</b> ${phone.mainFeatures ? phone.mainFeatures.chipSet : "No Chip Set Found!"}</li>
            <li class="pb-2"><b>Display:</b> ${phone.mainFeatures ? phone.mainFeatures.displaySize : "No Display Size Include!"}</li>
            <li class="pb-2"><b>Memory:</b> ${phone.mainFeatures ? phone.mainFeatures.memory : "No Memory Size Include!"}</li>
            <li class="pb-2"><b>Storage:</b> ${phone.mainFeatures ? phone.mainFeatures.storage : "No Storage Size Include!"}</li>
        </ul>
    `;
};
loadPhones("apple");
