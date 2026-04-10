# 🎬 Film Database

Dette er en enkel webapplikasjon som lar deg legge til, vise og slette filmer fra en MySQL database.

## 📁 Teknologier
- HTML
- CSS
- Bootstrap
- JavaScript (Fetch API)
- PHP
- MySQL (WAMP)

---

## 🗄️ Database

Prosjektet bruker en database kalt **FilmDatabase**.

### Tabeller:
- **Film**
  - FilmId
  - Tittel
  - Spilletid
  - Produksjonsar
  - Regissor
  - SjangerId

- **Sjanger**
  - SjangerId
  - Navn

---

## ⚙️ Funksjoner

### ✔ Legg til film
Du kan legge til nye filmer via skjemaet på nettsiden.

### ✔ Vis filmer
Alle filmer hentes fra databasen og vises i en tabell.

### ✔ Slett film
Du kan slette filmer direkte fra tabellen.

---

## 🔌 API

Backend er laget i PHP.

URL:
http://127.0.0.1/film-api/filmer.php

### Metoder:
- GET → Henter filmer
- POST → Legger til film
- DELETE → Sletter film

---

## ▶️ Hvordan kjøre prosjektet

1. Start WAMP (Apache + MySQL)
2. Importer SQL filen i phpMyAdmin
3. Legg prosjektet i `www` mappen
4. Åpne `index.html` med Live Server

---

## 💡 Forbedringer som kan gjøres
- Update funksjon
- Dropdown for sjanger
- Søkefelt
- Bedre design

---

## 👨‍💻 Prosjekt
Dette er et skoleprosjekt som viser CRUD operasjoner med database og API.