const API = "http://127.0.0.1/film-api/filmer.php";


// READ
async function loadFilms() {
    const res = await fetch(API);
    const data = await res.json();

    const table = document.getElementById("filmTable");
    table.innerHTML = "";

    data.forEach(film => {
        table.innerHTML += `
            <tr>
                <td>${film.FilmId}</td>
                <td>${film.Tittel}</td>
                <td>${film.Sjanger}</td>
                <td>
                    <button class="btn btn-danger btn-sm" onclick="deleteFilm(${film.FilmId})">
                        Slett
                    </button>
                </td>
            </tr>
        `;
    });
}


// CREATE
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

    loadFilms();
}


// DELETE
async function deleteFilm(id) {
    await fetch(API + "?id=" + id, {
        method: "DELETE"
    });

    loadFilms();
}


// start
loadFilms();