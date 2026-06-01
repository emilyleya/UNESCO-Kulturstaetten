# ⏳ CHRONOS | Interaktive Weltkulturerbe-Expedition

Eine immersive, gamifizierte Webanwendung zur Entdeckung und Erforschung von UNESCO-Welterbestätten. Dieses Projekt wurde als **Universitätsprojekt** für die Zielgruppe der 20-40-Jährigen entwickelt. Es kombiniert modernes, minimalistisches Design im Apple-Stil (Glassmorphismus) mit pädagogischen Gamification-Elementen und einer automatisierten Daten-Pipeline.

---

## 🚀 Live-Demo
Die Anwendung ist über GitHub Pages öffentlich erreichbar:
👉 **[HIER DEINEN GITHUB-PAGES-LINK EINFÜGEN, Z.B. https://dein-username.github.io/unesco-projekt/]**

---

## 🛠️ Technische Architektur & Features

### 1. Daten-Pipeline & Engineering (R)
Die Datenbasis wird nicht statisch eingepflegt, sondern über ein automatisiertes R-Skript (`data_prep.R`) generiert:
* **Datenquelle:** Live-Download der offiziellen UNESCO-Welterbe-Datenbank im CSV-Format.
* **Verarbeitung:** Bereinigung, Filterung und Anreicherung der Daten mit dedizierten Storytelling-Inhalten (Anekdoten, Quizfragen, Audio-Pfaden) mittels `tidyverse`.
* **Export:** Konvertierung der tabellarischen Daten in eine räumliche GeoJSON-Datenbank via `sf` (Simple Features für R).

### 2. Frontend & Map-Engine (JavaScript / Maplibre GL JS)
* **Karten-Framework:** `Maplibre GL JS` (100% Open-Source, performant und komplett ohne kostenpflichtige API-Keys oder Tracking).
* **Cinematic Tours:** Automatisierte Kamera-Flüge (Scrollytelling/FlyTo-Mechanik) zu vordefinierten historischen Wegpunkten innerhalb der Stätten.
* **Audio-Engine:** Ortsabhängiges Laden von atmosphärischen Ambient-Soundscapes zur Steigerung der Immersion.

### 3. UI/UX Design (CSS3)
* **Apple Premium-Stil:** Konsequenter Einsatz von Dark Mode, kühlen Akzentfarben (`#0071e3`), feinen Typografien (`Inter` & `Playfair Display`) und modernem **Glassmorphismus** (`backdrop-filter: blur`).
* **Responsive Layout:** Optimierte Sidebar-Steuerung mit flüssigen CSS-Zustandsanimationen beim Wechsel zwischen Explorer-Modus und Detailansicht.

### 4. Gamification-Kern
* **Progress-Engine:** Lokales Speichern des Benutzerfortschritts (XP-Punkte und freigeschaltete Ränge vom *Novizen* bis zum *Groß-Archivar*) über die `localStorage`-API des Browsers (keine externe Datenbank notwendig, serverlos und datenschutzkonform).
* **Wissenstest:** Interaktives Quiz-System pro Welterbestätte zur spielerischen Wissensüberprüfung vor der Archivierung.

---

## 📂 Ordnerstruktur

```text
unesco-projekt/
├── audio/             # Lokale MP3-Soundscapes für das Audio-Ambiente
├── data_prep.R        # R-Skript für den automatisierten Daten-Download & Export
├── welterbe.geojson   # Die von R generierte räumliche Datenbank (Web-Futter)
├── index.html         # HTML5-Struktur und Einbindung externer Assets
├── style.css          # Apple-Designsystem, Animationen & Glass-Effekte
├── app.js             # Logik-Kern (Kartensteuerung, Quiz & Gamification)
└── README.md          # Projektdokumentation
