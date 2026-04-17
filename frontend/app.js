const API = "http://127.0.0.1/film-api/filmer.php";

let currentSearch = "";
let currentGenre = "";
let filterOpen = false;

// 🎯 SORT STATE
let sortMode = "id";          // "id" eller "year"
let sortDirection = "desc";   // kun brukt for year

// =====================
// LOAD / SEARCH
// =====================
async function loadFilms(search = "", genre = "") {

    const res = await fetch(API + "?search=" + search);
    let data = await res.json();

    // filter sjanger
    if (genre !== "") {
        data = data.filter(film => film.Sjanger === genre);
    }

    // 🎬 SORT: ID (default)
    if (sortMode === "id") {
        data.sort((a, b) => Number(a.FilmId) - Number(b.FilmId));
    }

    // 📅 SORT: YEAR
    else if (sortMode === "year") {
        data.sort((a, b) => {
            if (sortDirection === "asc") {
                return Number(a.Produksjonsar) - Number(b.Produksjonsar);
            } else {
                return Number(b.Produksjonsar) - Number(a.Produksjonsar);
            }
        });
    }

    renderFilms(data);
}


// =====================
// RENDER TABLE
// =====================
function formatSpilletid(minutter) {
    const hours = Math.floor(minutter / 60);
    const mins = minutter % 60;

    if (hours === 0) {
        return `${mins}m`;
    }

    if (mins === 0) {
        return `${hours}t`;
    }

    return `${hours}t ${mins}m`;
}

function renderFilms(data) {
    const table = document.getElementById("filmTable");
    table.innerHTML = "";

    data.forEach(film => {
        table.innerHTML += `
            <tr>
                <td>${film.FilmId}</td>
                <td>${film.Tittel}</td>
                <td>${film.Sjanger}</td>
                <td>${film.Produksjonsar}</td>
                <td>${formatSpilletid(film.Spilletid)}</td>
                <td>
                    <button class="btn btn-danger btn-sm" onclick="deleteFilm(${film.FilmId})">
                        Slett
                    </button>
                </td>
            </tr>
        `;
    });
}


// =====================
// SEARCH INPUT
// =====================
function liveSearch() {
    const input = document.getElementById("search").value;

    if (input.startsWith("!")) return;

    currentSearch = input;
    loadFilms(currentSearch, currentGenre);
}

async function handleCommand(event) {
    if (event.key !== "Enter") return;

    const input = document.getElementById("search").value;
    const query = input.toLowerCase();

    if (!query.startsWith("!")) return;

    const command = query.substring(1);

    if (command === "admin") {
        alert("Admin mode 😎");
        loadFilms();
        return;
    }

    if (command === "random") {
        const res = await fetch(API);
        const data = await res.json();

        const randomFilm = data[Math.floor(Math.random() * data.length)];
        renderFilms([randomFilm]);
        return;
    }

    if (command === "clear") {
        document.getElementById("search").value = "";
        loadFilms();
        return;
    }

    alert("Ukjent kommando 🤔");
}


// =====================
// FILTER
// =====================
function toggleFilterMenu() {
    const menu = document.getElementById("filterMenu");

    filterOpen = !filterOpen;

    if (filterOpen) {
        menu.classList.remove("d-none");
        loadFilterMenu();
    } else {
        menu.classList.add("d-none");
    }
}

async function loadFilterMenu() {
    const res = await fetch("http://127.0.0.1/film-api/sjanger.php");
    const data = await res.json();

    const menu = document.getElementById("filterMenu");
    menu.innerHTML = "";

    data.forEach(sjanger => {
        const btn = document.createElement("button");

        btn.className = "btn btn-outline-dark btn-sm m-1";
        btn.textContent = sjanger.Navn;

        btn.onclick = () => {
            currentGenre = sjanger.Navn;
            loadFilms(currentSearch, currentGenre);

            menu.classList.add("d-none");
            filterOpen = false;
        };

        menu.appendChild(btn);
    });
}

function resetFilter() {
    currentSearch = "";
    currentGenre = "";
    document.getElementById("search").value = "";

    loadFilms();
}


// =====================
// SORT
// =====================

// 🎯 ID = reset ALT til default sort
function sortById() {
    sortMode = "id";
    sortDirection = "desc";

    loadFilms(currentSearch, currentGenre);
}

// 📅 YEAR SORT
function toggleSort() {
    sortMode = "year";

    sortDirection = (sortDirection === "asc") ? "desc" : "asc";

    loadFilms(currentSearch, currentGenre);
}


// =====================
// CREATE
// =====================
async function addFilm() {
    await fetch(API, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
            tittel: document.getElementById("tittel").value,
            spilletid: document.getElementById("spilletid").value,
            produksjonsar: document.getElementById("produksjonsar").value,
            regissor: document.getElementById("regissor").value,
            sjanger_id: document.getElementById("sjanger").value
        })
    });

    document.getElementById("tittel").value = "";
    document.getElementById("spilletid").value = "";
    document.getElementById("produksjonsar").value = "";
    document.getElementById("regissor").value = "";
    document.getElementById("sjanger").value = "";

    alert("Film lagt til!");

    // tilbake til ID-sort
    sortMode = "id";
    sortDirection = "desc";

    loadFilms();
}


// =====================
// DELETE
// =====================
async function deleteFilm(id) {
    await fetch(API + "?id=" + id, {
        method: "DELETE"
    });

    loadFilms();
}


// =====================
// START
// =====================
loadFilms();

const SJANGER_API = "http://127.0.0.1/film-api/sjanger.php";

async function loadSjangere() {
    const res = await fetch(SJANGER_API);
    const data = await res.json();

    const select = document.getElementById("sjanger");
    select.innerHTML = "<option value=''>Velg sjanger</option>";

    data.forEach(sjanger => {
        select.innerHTML += `
            <option value="${sjanger.SjangerId}">
                ${sjanger.Navn}
            </option>
        `;
    });
}

loadSjangere();