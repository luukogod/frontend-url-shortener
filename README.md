# URL Shortener Frontend Assignment (2–3 hours)

This repository includes the Go/Gin backend at the repository root and a Next.js frontend under `src/`.

## Running the full stack

1. **Backend** (terminal one), from the repo root:

```bash
go run .
```

The service listens on `http://localhost:8080`.

2. **Frontend** (terminal two):

```bash
npm install
```

Copy `.env.example` to `.env.local` and adjust if your API is not on port 8080. On Windows PowerShell you can run `Copy-Item .env.example .env.local`.

```bash
npm run dev
```

Open `http://localhost:3000`. If `NEXT_PUBLIC_API_BASE_URL` is unset, the client defaults to `http://localhost:8080`.

### Frontend scripts

| Command | Purpose |
| --- | --- |
| `npm run dev` | Next.js dev server |
| `npm run build` | Production build |
| `npm run start` | Production server |
| `npm run lint` | ESLint |
| `npm test` | Jest unit tests |
| `npm run test:coverage` | Jest with coverage |

### Endpoints used by the frontend

- `POST /api/shortlinks` — body `{ "original_url": "https://..." }`; response includes `id`, `original_url`, `short_url`, `created_at` (ISO 8601 string from the client’s perspective).
- `GET /api/shortlinks` — list of the same objects.
- `GET /shortlinks/:id` — redirect to the original URL (used when opening or testing a short link).

---

📌 **Objective**
Build a Next.js frontend application that interfaces with a URL shortener backend service. This exercise tests component architecture, state management, API integration, server-side rendering, and user experience design.

📦 **Requirements**

## 1. Core Functionality
Implement a web application that allows users to:
- Enter a long URL and generate a shortened version
- View a list of their previously created short links
- Copy short URLs to clipboard
- Click short URLs to test redirection (opens in new tab)
- Display creation timestamps for each link

## 2. User Interface Components

### Main URL Shortener Form
- Input field for original URL with validation
- Submit button to create short link
- Loading state during API calls
- Success/error feedback messages

### Short Links List
- Display all created short links in a clean list/table format
- Show original URL, short URL, and creation date
- Copy-to-clipboard functionality for each short URL
- "Test Link" button that opens the short URL in a new tab

### Navigation & Layout
- Clean, responsive design
- Header with application title
- Proper spacing and typography

## 3. Technical Requirements

### API Integration
The frontend should integrate with the backend URL shortener service:

```typescript
// Expected API endpoints
POST /api/shortlinks
GET /api/shortlinks/{id}
GET /shortlinks/{id} (redirect endpoint)
```

### State Management
- Use React hooks (useState, useEffect) or context for state management
- Maintain list of created short links in component state
- Handle loading, success, and error states

### Validation & Error Handling
- Validate URLs before submission (proper format)
- Handle API errors gracefully with user-friendly messages
- Show loading indicators during API calls

## 💾 **Tech Stack**
- **Framework**: Next.js 14+ with TypeScript
- **Styling**: Tailwind CSS
- **HTTP Client**: fetch API or axios
- **State Management**: React hooks and Next.js state management patterns
- **Routing**: Next.js App Router or Pages Router

## ✅ **Constraints**
- Must be responsive (desktop and mobile)
- Use TypeScript for type safety
- Handle edge cases (network errors, invalid URLs)
- Assume backend runs on `http://localhost:8080`
- No authentication required
- Modern browser support (Chrome, Firefox, Safari)
- Use Next.js best practices (SSR/SSG where appropriate)

## 🎨 **UI/UX Requirements**
- Clean, intuitive interface
- Proper loading states and feedback
- Responsive design (mobile-friendly)

## 🧪 **Bonus Features** (Optional, if you have time)
- [ ] QR code generation for short URLs

## 📁 **Project Structure**
```
src/
├── app/                    # App Router (Next.js 13+)
│   ├── page.tsx           # Home page
│   ├── layout.tsx         # Root layout
│   └── globals.css        # Global styles
├── components/
│   ├── UrlShortenerForm/
│   ├── ShortLinksList/
│   ├── ShortLinkItem/
│   └── Layout/
├── hooks/
│   └── useUrlShortener.ts
├── lib/
│   └── api.ts            # API utilities
├── types/
│   └── index.ts
└── utils/
    └── validation.ts
```

## 🧪 **Testing Requirements**
- Write unit tests for key components using Jest and React Testing Library
- Test form validation logic
- Test API integration (with mocked responses)
- Test copy-to-clipboard functionality
- Test Next.js specific features (routing, SSR if implemented)

## 📋 **README Requirements**
Your README.md should include:

### Setup Instructions
```bash
# Example setup commands
npx create-next-app@latest url-shortener-frontend --typescript --tailwind --eslint
cd url-shortener-frontend
npm run dev
```

### Environment Configuration
```bash
# .env.local example
NEXT_PUBLIC_API_BASE_URL=http://localhost:8080
```

### Usage Examples
- Loom video
- Step-by-step user flow description

### API Integration
- Documentation of how the frontend connects to the backend
- Example API request/response formats used

### Testing
```bash
# How to run tests
npm run test
npm run test:coverage
npm run build  # Test production build
```

## 🔗 **Backend Integration Notes**

Your frontend will connect to a URL shortener backend with these endpoints:

### Create Short Link
```bash
curl -X POST http://localhost:8080/api/shortlinks \
  -H "Content-Type: application/json" \
  -d '{"original_url": "https://example.com"}'
```

### Get Short Link Details
```bash
curl http://localhost:8080/api/shortlinks/abc123
```

### Test Redirect
```bash
curl -I http://localhost:8080/shortlinks/abc123
```

Make sure your frontend gracefully handles backend downtime or slow responses.

---

