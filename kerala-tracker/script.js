// ---------- config ----------
const KERALA_CENTER = [10.4, 76.4];
const KERALA_BOUNDS = L.latLngBounds([7.7, 74.6], [12.9, 78.2]);
const MIN_ZOOM = 7;
const MAX_ZOOM = 12;

const AQI_BANDS = [
  { key: "good", max: 50, label: "GOOD" },
  { key: "moderate", max: 100, label: "MODERATE" },
  { key: "poor", max: 150, label: "POOR" },
  { key: "severe", max: Infinity, label: "SEVERE" },
];

function bandFor(aqi) {
  return AQI_BANDS.find((b) => aqi <= b.max) ?? AQI_BANDS[AQI_BANDS.length - 1];
}

// Swap this for a real API call later — everything else reads from its return value.
async function loadStations() {
  const res = await fetch("data/stations.json");
  if (!res.ok) throw new Error(`Failed to load station data: ${res.status}`);
  return res.json();
}

// ---------- map setup ----------
const map = L.map("map", {
  center: KERALA_CENTER,
  zoom: 8,
  minZoom: MIN_ZOOM,
  maxZoom: MAX_ZOOM,
  maxBounds: KERALA_BOUNDS.pad(0.2),
  maxBoundsViscosity: 0.8,
  zoomControl: true,
  attributionControl: true,
});

// Standard OpenStreetMap tiles, no API key required, recolored dark via CSS
// (see .leaflet-tile-pane filter in style.css).
L.tileLayer("https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png", {
  attribution: '&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors',
  subdomains: "abc",
  maxZoom: 19,
}).addTo(map);

const markerLayer = L.layerGroup().addTo(map);
const markersById = new Map();
let stationsCache = [];
let selectedId = null;

function stationIcon(band, selected) {
  return L.divIcon({
    className: "",
    html: `<div class="station-marker ${band}${selected ? " selected" : ""}"></div>`,
    iconSize: [22, 22],
    iconAnchor: [11, 11],
  });
}

function youAreHereIcon() {
  return L.divIcon({
    className: "",
    html: `<div class="you-are-here"></div>`,
    iconSize: [18, 18],
    iconAnchor: [9, 9],
  });
}

function renderMarkers(stations) {
  markerLayer.clearLayers();
  markersById.clear();

  stations.forEach((station) => {
    const band = bandFor(station.aqi).key;
    const marker = L.marker([station.lat, station.lng], {
      icon: stationIcon(band, station.id === selectedId),
      keyboard: true,
      alt: station.name,
    });
    marker.on("click", () => selectStation(station.id));
    marker.addTo(markerLayer);
    markersById.set(station.id, marker);
  });
}

function refreshSelectedIcon() {
  markersById.forEach((marker, id) => {
    const station = stationsCache.find((s) => s.id === id);
    if (!station) return;
    const band = bandFor(station.aqi).key;
    marker.setIcon(stationIcon(band, id === selectedId));
  });
}

// ---------- readout card ----------
const readoutEl = document.getElementById("readout");
const readoutCloseBtn = document.getElementById("readout-close");

function selectStation(id) {
  const station = stationsCache.find((s) => s.id === id);
  if (!station) return;

  selectedId = id;
  refreshSelectedIcon();

  const band = bandFor(station.aqi);
  readoutEl.dataset.band = band.key;
  document.getElementById("readout-id").textContent = station.id;
  document.getElementById("readout-name").textContent = station.name.toUpperCase();
  document.getElementById("readout-aqi").textContent = `${station.aqi} · ${band.label}`;
  document.getElementById("readout-pm25").textContent = `${station.pm25} µg/m³`;
  document.getElementById("readout-temp").textContent = `${station.temp_c}°C`;
  document.getElementById("readout-humidity").textContent = `${station.humidity}%`;
  document.getElementById("readout-updated").textContent = formatTime(station.last_updated);
  readoutEl.hidden = false;
}

readoutCloseBtn.addEventListener("click", () => {
  readoutEl.hidden = true;
  selectedId = null;
  refreshSelectedIcon();
});

function formatTime(iso) {
  try {
    const d = new Date(iso);
    return d.toLocaleTimeString("en-IN", { timeZone: "Asia/Kolkata", hour: "2-digit", minute: "2-digit", hour12: false }) + " IST";
  } catch {
    return iso;
  }
}

// ---------- geolocation ("you are here") ----------
function haversineKm(a, b) {
  const R = 6371;
  const dLat = ((b.lat - a.lat) * Math.PI) / 180;
  const dLng = ((b.lng - a.lng) * Math.PI) / 180;
  const lat1 = (a.lat * Math.PI) / 180;
  const lat2 = (b.lat * Math.PI) / 180;
  const h =
    Math.sin(dLat / 2) ** 2 + Math.cos(lat1) * Math.cos(lat2) * Math.sin(dLng / 2) ** 2;
  return 2 * R * Math.asin(Math.sqrt(h));
}

function initGeolocation(stations) {
  if (!("geolocation" in navigator)) return;

  navigator.geolocation.getCurrentPosition(
    (pos) => {
      const here = { lat: pos.coords.latitude, lng: pos.coords.longitude };
      L.marker([here.lat, here.lng], { icon: youAreHereIcon(), zIndexOffset: 1000 })
        .addTo(map)
        .bindTooltip("YOU ARE HERE", { direction: "top", offset: [0, -6] });

      let nearest = stations[0];
      let nearestDist = Infinity;
      for (const s of stations) {
        const d = haversineKm(here, s);
        if (d < nearestDist) {
          nearestDist = d;
          nearest = s;
        }
      }
      selectStation(nearest.id);
    },
    () => {
      // Permission denied or unavailable — skip silently, no error dialog.
    },
    { timeout: 8000 }
  );
}

// ---------- ticker ----------
const tickerText = document.getElementById("ticker-text");
const tickerTrack = document.getElementById("ticker-track");

function buildTickerString(stations) {
  return stations
    .map((s) => `${s.id} REPORTING ${bandFor(s.aqi).label} AQI`)
    .join("   ·   ");
}

function startTicker(stations) {
  const line = buildTickerString(stations);
  tickerText.textContent = `${line}   ·   ${line}`;

  let muted = false;
  const muteBtn = document.getElementById("mute-toggle");
  const muteIcon = document.getElementById("mute-icon");

  let audioCtx = null;
  function beep() {
    if (muted) return;
    try {
      audioCtx = audioCtx || new (window.AudioContext || window.webkitAudioContext)();
      const osc = audioCtx.createOscillator();
      const gain = audioCtx.createGain();
      osc.type = "square";
      osc.frequency.value = 880;
      gain.gain.value = 0.02;
      osc.connect(gain).connect(audioCtx.destination);
      osc.start();
      osc.stop(audioCtx.currentTime + 0.05);
    } catch {
      // Web Audio unavailable — fail silently.
    }
  }

  muteBtn.addEventListener("click", () => {
    muted = !muted;
    muteBtn.setAttribute("aria-pressed", String(muted));
    muteIcon.textContent = muted ? "🔇" : "🔊";
  });

  setInterval(beep, 4000);
}

// ---------- boot ----------
loadStations()
  .then((stations) => {
    stationsCache = stations;
    renderMarkers(stations);
    startTicker(stations);
    initGeolocation(stations);
  })
  .catch((err) => {
    tickerText.textContent = "STATION FEED UNAVAILABLE — CHECK data/stations.json";
    console.error(err);
  });
