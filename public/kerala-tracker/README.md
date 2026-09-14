# VAYUVEGA — Kerala Air Watch

A retro CRT/analog-instrument styled interactive map of mock air-quality "stations" across Kerala,
inspired by the interaction model of Sony's Spidey Tracker. No build step — open `index.html` directly,
or serve the folder with any static file server.

## Files

- `index.html` — page structure
- `style.css` — CRT/scanline theme, markers, panels, ticker
- `script.js` — map setup, station rendering, geolocation, ticker, radar
- `data/stations.json` — mock station readings

## Running it

Because `script.js` fetches `data/stations.json` with `fetch()`, opening `index.html` via a plain
`file://` URL will fail in most browsers (CORS blocks local `fetch` of local files). Serve it instead:

```bash
npx serve .
# or
python -m http.server 8080
```

Then open the printed `localhost` URL. Geolocation also requires `localhost` or HTTPS — it won't work
over a plain `file://` URL or a non-secure remote origin.

## Swapping in a real sensor feed

All station data flows through one function in `script.js`:

```js
async function loadStations() {
  const res = await fetch("data/stations.json");
  if (!res.ok) throw new Error(`Failed to load station data: ${res.status}`);
  return res.json();
}
```

To point this at a real API or LoRaWAN gateway later, change the body of this function only — keep the
return shape as an array of objects matching this structure:

```json
{
  "id": "KOCHI-04",
  "name": "Kochi",
  "lat": 9.9312,
  "lng": 76.2673,
  "aqi": 78,
  "pm25": 34,
  "temp_c": 29,
  "humidity": 81,
  "last_updated": "2026-09-14T09:12:00+05:30"
}
```

Everything downstream (markers, the readout card, the ticker, nearest-station selection) reads from
that shape, so nothing else needs to change.

## Notes

- Map tiles are CartoDB Dark Matter (free, no API key). Swap the `L.tileLayer` URL in `script.js` if
  you'd rather use a different tile provider.
- The radar widget and ticker tick sound are purely decorative.
- If geolocation permission is denied, the "you are here" marker is silently skipped — no error dialog.
