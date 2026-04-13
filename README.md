# URL Shortener (full stack)

Next.js **App Router** frontend and a **Go (Gin)** backend in one repository. The UI creates short links, lists them, supports copy and “test in new tab,” shows timestamps, and includes **QR codes** for each short URL (assignment bonus).

---

## Quick start

### 1. Backend

From the repository root:

```bash
go run .
```

Server: [http://localhost:8080](http://localhost:8080)  
Health: `GET /health`

### 2. Frontend

```bash
npm install
```

Copy environment defaults (adjust if your API host/port differs):

```bash
# Windows PowerShell
Copy-Item .env.example .env.local

# macOS / Linux
cp .env.example .env.local
```

```bash
npm run dev
```

App: [http://localhost:3000](http://localhost:3000)

The client reads **`NEXT_PUBLIC_API_BASE_URL`** (see `.env.example`). If unset, it defaults to `http://localhost:8080`.

---

## Environment configuration

`.env.example`:

```bash
NEXT_PUBLIC_API_BASE_URL=http://localhost:8080
```

Create `.env.local` with the same keys; Next.js loads it automatically for `next dev` / `next build`.

---

## User flow (step by step)

1. Start the Go server, then `npm run dev`.
2. Open the app in the browser. Existing short links load from `GET /api/shortlinks` (empty list on first run).
3. Enter a full URL including `http://` or `https://`, then **Shorten URL**.
4. On success, the new link appears at the top of the list with original URL, short URL, created time, **Copy**, **Test Link** (new tab), and a **QR code**.
5. Invalid URLs show a validation message before any network call. API errors show the backend `error` text when present.
6. If the backend is down, very slow, or unreachable, the UI shows a clear message (including a **15s request timeout**).

---

## Demo recording (Loom)

_Add your Loom (or other) walkthrough URL here after you record it._

---

## How the frontend talks to the backend

All requests use the **fetch** API from `src/lib/api.ts`. Paths are appended to `NEXT_PUBLIC_API_BASE_URL` (no trailing slash on the base).

| Method | Path | Used in UI |
| --- | --- | --- |
| `POST` | `/api/shortlinks` | Create link |
| `GET` | `/api/shortlinks` | Load list on home page |
| `GET` | `/api/shortlinks/:id` | Exposed as `getShortLinkById` for reuse/tests |
| `GET` | `/shortlinks/:id` | Backend redirect (opening / testing a short URL) |

### Example: create short link

**Request**

```http
POST /api/shortlinks
Content-Type: application/json
```

```json
{
  "original_url": "https://example.com"
}
```

**Response** `201 Created`

```json
{
  "id": "aB3d9x",
  "original_url": "https://example.com",
  "short_url": "http://localhost:8080/shortlinks/aB3d9x",
  "created_at": "2026-04-13T12:00:00Z"
}
```

`created_at` is serialized as an RFC3339 / ISO-8601 string in JSON.

### Example: list short links

**Request**

```http
GET /api/shortlinks
```

**Response** `200 OK`

```json
[
  {
    "id": "aB3d9x",
    "original_url": "https://example.com",
    "short_url": "http://localhost:8080/shortlinks/aB3d9x",
    "created_at": "2026-04-13T12:00:00Z"
  }
]
```

### Example: get one link by id

**Request**

```http
GET /api/shortlinks/aB3d9x
```

**Response** `200 OK` — same object shape as a single element in the list. `404` returns `{ "error": "..." }`.

### cURL (backend)

```bash
curl -X POST http://localhost:8080/api/shortlinks \
  -H "Content-Type: application/json" \
  -d "{\"original_url\": \"https://example.com\"}"

curl http://localhost:8080/api/shortlinks

curl -I http://localhost:8080/shortlinks/aB3d9x
```

---

## Tech stack

- **Frontend:** Next.js 16+ (App Router), React 19, TypeScript, Tailwind CSS v4, `fetch`
- **State:** React hooks (`useUrlShortener` loads and mutates the list)
- **Backend:** Go 1.21+, Gin (see `main.go`)

### Rendering note

The home route is a **server** `page.tsx` that composes layout chrome and **client** islands (`HomePage`, form, list). Link data is loaded **on the client** after mount so the page stays simple and matches hook-based state requirements.

---

## Project structure (frontend)

```
src/
├── app/
│   ├── layout.tsx
│   ├── page.tsx
│   └── globals.css
├── components/
│   ├── Layout/
│   ├── UrlShortenerForm/
│   ├── ShortLinksList/
│   └── ShortLinkItem/
├── hooks/
│   └── useUrlShortener.ts
├── lib/
│   └── api.ts
├── types/
│   └── index.ts
├── utils/
│   └── validation.ts
└── __tests__/
```

---

## Scripts

```bash
npm run dev          # development server
npm run build        # production build
npm run start        # production server
npm run lint         # ESLint
npm test             # Jest + React Testing Library
npm run test:coverage
```

---

## Testing

Tests cover URL validation, mocked API client (including timeout handling), clipboard + QR on a list row, home validation flow, and a thin **App Router** smoke test for `app/page.tsx`.

```bash
npm test
npm run test:coverage
npm run build
```

---

## Assignment brief

The original exercise specification is unchanged in intent; this README is the **submission** document (setup, env, flow, API, tests). For backend-only notes you may also see `backend-README.md` in the repo.
