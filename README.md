# Reports Globe

Minimal static globe app with:

- Night-mode orthographic globe
- Country boundary markings
- Drag rotation
- Clickable report dots with side-panel cards
- Report import for lat/lon strings, objects, arrays, and MGRS
- Text-only project export and rebuild tooling

## Run locally

```bash
npm run serve
```

Open `http://127.0.0.1:4173`.

Notes:

- The app is static and build-free.
- Country boundaries are bundled locally.
- The MGRS helper is vendored locally, so the rebuilt app works offline.

## Report format

The importer accepts a JSON array. Examples:

```json
[
  {
    "id": "rpt-001",
    "title": "Surface contact",
    "summary": "Observation near the port.",
    "location": "33.7405, -118.2760",
    "category": "MARITIME",
    "timestamp": "2026-04-27T06:20:00Z"
  },
  {
    "id": "rpt-002",
    "title": "Grid reference",
    "summary": "MGRS-derived position.",
    "mgrs": "11SLT 94056 05668",
    "category": "GROUND"
  }
]
```

Supported location shapes:

- `"location": "lat, lon"`
- `"location": { "lat": 34.0, "lon": -118.2 }`
- `"lat": 34.0, "lon": -118.2`
- `"coordinates": [-118.2, 34.0]`
- `"position": { "type": "mgrs", "value": "11SLT 94056 05668" }`
- `"mgrs": "11SLT 94056 05668"`

## Pack into text files

```bash
npm run pack
```

This creates `transfer/` with:

- `bundle.part-*.txt` chunk files
- `manifest.json.txt`
- `rebuild-project.txt`

The packer only includes the files needed to run and re-pack the app, and it keeps the
output to 10 files or fewer so it can be transferred in a single pass.

## Build the consolidated bundle

```bash
npm run pack:consolidated
```

This wipes and rebuilds `consolidated-bundle/` with:

- one combined code bundle text file
- only the runtime image assets as image files
- `manifest.json.txt`
- `rebuild-project.txt`

Everything is flattened into a single folder and stays well under the 10-file limit.

## Rebuild from transferred text files

From a directory containing the transferred `transfer/` files:

```bash
node rebuild-project.txt
```

Optional output directory:

```bash
node rebuild-project.txt ./restored-project
```
