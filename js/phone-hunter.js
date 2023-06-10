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
        console.log(phone);
        const phonesDiv = document.createElement("div");
        phonesDiv.classList.add("col");
        phonesDiv.innerHTML = `
            <div class="card">
                <img src="${phone.image}" class="card-img-top p-3" alt="..." />
                <div class="card-body">
                    <h3 class="card-title">${phone.phone_name}</h3>
                    <h6 style="color: gray;">Brand: ${phone.brand}</h6>
                    <p class="card-text">This is a longer card with supporting text below as a natural lead-in to additional content. This content is a little bit longer.</p>
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
    inputField.value = "";
};
// search phones
document.getElementById("btnSearch").addEventListener("click", function () {
    processSearch(10);
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
// loadPhones("apple");
