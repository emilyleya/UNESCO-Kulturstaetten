/**
 * CHRONOS Engine - Immersive Interactive Storytelling & Mapping Core
 */

const HERITAGE_DATA = [
    {
        id: "colosseum",
        title: "Das Kolosseum von Rom",
        country: "Italien",
        category: "Kulturerbe",
        year: 1980,
        coordinates: [41.8902, 12.4922],
        zoom: 16,
        images: [
            "https://images.unsplash.com/photo-1552832230-c0197dd311b5?auto=format&fit=crop&w=600&q=80",
            "https://images.unsplash.com/photo-1515542622106-78bda8ba0e5b?auto=format&fit=crop&w=600&q=80"
        ],
        context: "Das Kolosseum ist das größte je gebaute Amphitheater der Welt und ein monumentales Meisterwerk römischer Ingenieurskunst. Erbaut im 1. Jahrhundert n. Chr. unter den flavischen Kaisern, bot es Platz für bis zu 50.000 Zuschauer, die dort Gladiatorenkämpfe, Tierhetzen und monumentale Seeschlachten (Naumachien) verfolgten.",
        anecdote: "Wusstest du, dass der monumentale Bau komplett durch die Beute des Jüdischen Krieges und die Plünderung Jerusalems finanziert wurde? Nahezu 100.000 jüdische Sklaven wurden nach Rom verschleppt, um die tonnenschweren Travertinblöcke zu behauen und zu transportieren.",
        tourWaypoints: [
            { coords: [41.8902, 12.4922], text: "Zentraler Blick auf das flavische Amphitheater.", zoom: 17 },
            { coords: [41.8905, 12.4935], text: "Der Ludus Magnus - Ruinen der größten Gladiatorenschule direkt nebenan.", zoom: 18 },
            { coords: [41.8892, 12.4907], text: "Blick vom Konstantinsbogen auf den imperialen Haupteingang.", zoom: 18 }
        ]
    },
    {
        id: "petra",
        title: "Die Felsenstadt Petra",
        country: "Jordanien",
        category: "Kulturerbe",
        year: 1985,
        coordinates: [30.3285, 35.4444],
        zoom: 15,
        images: [
            "https://images.unsplash.com/photo-1541432901042-2d8bd64b4a9b?auto=format&fit=crop&w=600&q=80",
            "https://images.unsplash.com/photo-1579606038753-a7ee00c0f4f5?auto=format&fit=crop&w=600&q=80"
        ],
        context: "Petra war in der Antike die glanzvolle Hauptstadt des Reiches der Nabatäer. Ein strategischer Knotenpunkt, an dem die Weihrauchstraße und wichtige Handelsrouten zusammenliefen. Die Stadt ist weltberühmt für ihre monumentalen, direkt aus dem schieren roten Sandsteinfels gemeißelten Fassaden und ihre hochkomplexen Wasserspeichersysteme.",
        anecdote: "Das berühmteste Bauwerk, das Khazne al-Firaun ('Schatzhaus des Pharaos'), verdankt seinen Namen einer Legende der Beduinen. Sie glaubten, ein ägyptischer Pharao habe seinen Schatz in der riesigen Urne auf der Spitze der Fassade versteckt. Noch heute sieht man dort Einschusslöcher von Gewehren historischer Schatzsucher.",
        tourWaypoints: [
            { coords: [30.3285, 35.4444], text: "Das legendäre Schatzhaus Khazne al-Firaun.", zoom: 17 },
            { coords: [30.3223, 35.4516], text: "Der Siq - die dramatische, teils nur 3 Meter breite Felsschlucht, die als Hauptzugang diente.", zoom: 16 },
            { coords: [30.3281, 35.4312], text: "Das Ad-Deir Kloster, hoch oben in den Bergen in den Fels gehauen.", zoom: 17 }
        ]
    },
    {
        id: "machupicchu",
        title: "Machu Picchu",
        country: "Peru",
        category: "Gemischt",
        year: 1983,
        coordinates: [-13.1631, -72.5450],
        zoom: 15,
        images: [
            "https://images.unsplash.com/photo-1587595431973-160d0d94adb1?auto=format&fit=crop&w=600&q=80",
            "https://images.unsplash.com/photo-1526392060635-9d6019884377?auto=format&fit=crop&w=600&q=80"
        ],
        context: "Machu Picchu ist eine perfekt erhaltene Ruinenstadt der Inka, erbaut im 15. Jahrhundert in 2.430 Metern Höhe auf einem Bergrücken der Anden über dem Urubambatal. Sie wurde als imperiale Residenz für den Inka-Herrscher Pachacútec Yupanqui errichtet und zeugt von unübertroffener astronomischer Ausrichtung und Terrassenbaukunst.",
        anecdote: "Die Inka bauten Machu Picchu vollkommen erdbebensicher. Bei ihrer als 'Ashlar' bekannten Bauweise wurden tonnenschwere Steine ohne jeglichen Mörtel so präzise aneinandergepasst, dass nicht einmal eine Messerklinge dazwischen passt. Bei einem Erdbeben 'tanzen' die Steine und fallen exakt in ihre Position zurück.",
        tourWaypoints: [
            { coords: [-13.1631, -72.5450], text: "Das klassische Panorama des urbanen Sektors und des Huayna Picchu.", zoom: 17 },
            { coords: [-13.1627, -72.5458], text: "Der Intihuatana-Stein - der rituelle Sonnenanzeiger der Inka.", zoom: 18 },
            { coords: [-13.1639, -72.5453], text: "Der Tempel der drei Fenster im heiligen Bezirk.", zoom: 18 }
        ]
    }
];

const TILE_LAYERS = {
    dark: "https://{s}.basemaps.cartocdn.com/dark_all/{z}/{x}/{y}{r}.png",
    light: "https://{s}.basemaps.cartocdn.com/light_all/{z}/{x}/{y}{r}.png"
};

let map, activeTileLayer;
let currentTheme = "dark";
let userXP = parseInt(localStorage.getItem("chronos_xp")) || 0;
let claimedSites = JSON.parse(localStorage.getItem("chronos_claimed")) || [];
let activeSite = null;

document.addEventListener("DOMContentLoaded", () => {
    initMap();
    initGamification();
    renderQuickList();
    setupEventListeners();
});

function initMap() {
            // Wir definieren die Grenzen der Welt (Süden, Westen, Norden, Osten)
            const weltGrenzen = L.latLngBounds(
                L.latLng(-85, -180), // Unten links (Südwesten)
                L.latLng(85, 180)    // Oben rechts (Nordosten)
            );

            // Initialisierung Karte mit Zoom-Stopp und Begrenzung
            map = L.map("map", { 
                zoomControl: false, 
                attributionControl: false,
                minZoom: 2.5,          // Verhindert das zu weite Rauszoomen (Zoom-Stopp!)
                maxBounds: weltGrenzen, // Sperrt das unendliche Scrollen nach links/rechts
                maxBoundsViscosity: 1.0 // Macht die Grenzen "hart", die Karte federt nicht zurück
            }).setView([25.0, 15.0], 3);

            // noWrap: true verhindert, dass die Kacheln sich wiederholen
            activeTileLayer = L.tileLayer(TILE_LAYERS[currentTheme], { 
                maxZoom: 19,
                noWrap: true 
            }).addTo(map);

            // Marker setzen
            HERITAGE_DATA.forEach(site => {
                const icon = L.divIcon({
                    className: "custom-premium-marker",
                    html: `<div class="marker-pulse-wrapper"><div class="marker-core"></div><div class="marker-pulse"></div></div>`,
                    iconSize: [20, 20], iconAnchor: [10, 10]
                });
                L.marker(site.coordinates, { icon: icon }).addTo(map).on("click", () => selectSite(site));
            });

            updateXPUIs();
            renderQuickList();
            setupEventListeners();
        }

function initGamification() { updateXPUIs(); }

function updateXPUIs() {
    document.getElementById("xp-points").innerText = userXP;
    let rank = "Novize"; let pct = 0;
    
    if (userXP >= 450) { rank = "Groß-Archivar"; pct = 100; }
    else if (userXP >= 300) { rank = "Elite-Forscher"; pct = ((userXP - 300) / 150) * 100; }
    else if (userXP >= 150) { rank = "Karten-Analyst"; pct = ((userXP - 150) / 150) * 100; }
    else { rank = "Novize"; pct = (userXP / 150) * 100; }
    
    document.getElementById("rank-badge").innerText = rank;
    document.getElementById("xp-bar-fill").style.width = `${pct}%`;
}

function renderQuickList() {
    const container = document.getElementById("quick-list-container");
    container.innerHTML = "";
    HERITAGE_DATA.forEach(site => {
        const item = document.createElement("button");
        item.className = "quick-item";
        item.innerHTML = `<div class="quick-item-title">${site.title}</div><div class="quick-item-meta">${site.country} • ${site.category}</div>`;
        item.addEventListener("click", () => selectSite(site));
        container.appendChild(item);
    });
}

function setupEventListeners() {
    document.getElementById("btn-toggle-theme").addEventListener("click", () => {
        currentTheme = currentTheme === "dark" ? "light" : "dark";
        document.body.className = currentTheme === "light" ? "light-theme" : "";
        activeTileLayer.setUrl(TILE_LAYERS[currentTheme]);
    });

    document.getElementById("btn-close-details").addEventListener("click", () => {
        document.getElementById("panel-details").classList.remove("active");
        setTimeout(() => {
            document.getElementById("panel-welcome").classList.add("active");
            map.flyTo([25.0, 15.0], 3, { duration: 1.5 });
            activeSite = null;
        }, 400);
    });

    const tabs = document.querySelectorAll(".tab-trigger");
    tabs.forEach(tab => {
        tab.addEventListener("click", (e) => {
            tabs.forEach(t => t.classList.remove("active"));
            document.querySelectorAll(".tab-panel").forEach(p => p.classList.remove("active"));
            e.target.classList.add("active");
            document.getElementById(e.target.getAttribute("data-tab")).classList.add("active");
        });
    });

    document.getElementById("btn-claim-xp").addEventListener("click", () => {
        if (!activeSite || claimedSites.includes(activeSite.id)) return;
        userXP += 150; claimedSites.push(activeSite.id);
        localStorage.setItem("chronos_xp", userXP);
        localStorage.setItem("chronos_claimed", JSON.stringify(claimedSites));
        updateXPUIs(); showTaskSuccess();
    });

    document.getElementById("btn-start-tour").addEventListener("click", () => {
        if (activeSite && activeSite.tourWaypoints) runVirtualTour(activeSite.tourWaypoints);
    });
}

function selectSite(site) {
    activeSite = site;
    map.flyTo(site.coordinates, site.zoom, { duration: 1.8 });

    document.getElementById("site-country").innerText = site.country;
    document.getElementById("site-category").innerText = site.category;
    document.getElementById("site-title").innerText = site.title;
    document.getElementById("site-year").innerText = `Eingeschrieben seit ${site.year}`;
    document.getElementById("site-context-text").innerText = site.context;
    document.getElementById("site-anecdote-text").innerText = site.anecdote;

    const activeImg = document.getElementById("gallery-img-active");
    activeImg.src = site.images[0];
    
    const thumbsContainer = document.getElementById("gallery-thumbs-container");
    thumbsContainer.innerHTML = "";
    site.images.forEach((imgUrl, idx) => {
        const thumb = document.createElement("div");
        thumb.className = `thumb-item ${idx === 0 ? 'active' : ''}`;
        thumb.innerHTML = `<img src="${imgUrl}">`;
        thumb.addEventListener("click", () => {
            document.querySelectorAll(".thumb-item").forEach(t => t.classList.remove("active"));
            thumb.classList.add("active");
            activeImg.src = imgUrl;
        });
        thumbsContainer.appendChild(thumb);
    });

    const claimBtn = document.getElementById("btn-claim-xp");
    const successToast = document.getElementById("task-success-message");
    if (claimedSites.includes(site.id)) {
        claimBtn.classList.add("disabled"); claimBtn.innerText = "Bereits archiviert";
        successToast.classList.remove("hidden");
    } else {
        claimBtn.classList.remove("disabled"); claimBtn.innerText = "+ 150 XP Sichern";
        successToast.classList.add("hidden");
    }

    document.getElementById("panel-welcome").classList.remove("active");
    setTimeout(() => document.getElementById("panel-details").classList.add("active"), 300);
}

function showTaskSuccess() {
    document.getElementById("btn-claim-xp").classList.add("disabled");
    document.getElementById("btn-claim-xp").innerText = "Bereits archiviert";
    document.getElementById("task-success-message").classList.remove("hidden");
}

function runVirtualTour(waypoints) {
    let currentStep = 0; const tourBtn = document.getElementById("btn-start-tour");
    tourBtn.disabled = true;
    
    function nextWaypoint() {
        if (currentStep >= waypoints.length) {
            tourBtn.disabled = false; tourBtn.innerHTML = "▶ Virtuelle Tour starten";
            map.flyTo(activeSite.coordinates, activeSite.zoom, { duration: 1.5 });
            return;
        }
        const pt = waypoints[currentStep];
        tourBtn.innerHTML = `🌐 Fliege Wegpunkt (${currentStep + 1}/${waypoints.length})`;
        map.flyTo(pt.coords, pt.zoom, { duration: 2.2 });
        currentStep++;
        setTimeout(nextWaypoint, 4000);
    }
    nextWaypoint();
}
