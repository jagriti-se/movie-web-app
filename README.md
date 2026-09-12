# Movie Discovery

A production-quality full-stack movie discovery application built with React, Express, MongoDB, and the TMDB API.

## Features

- Trending, popular, top-rated, and upcoming movie collections
- Debounced movie search with pagination
- Genre and year filtering
- Sorting by popularity, rating, release date, or title
- Detailed movie pages with backdrop, poster, genres, overview, runtime, and language
- Similar movie recommendations
- Persistent MongoDB-backed wishlist with add/remove and duplicate prevention
- Responsive mobile-first design
- Loading, error, empty, and retry states
- Accessible controls, keyboard focus states, and descriptive image alt text
- Server-side TMDB integration with API-key protection and in-memory caching

## Architecture

```text
React + Vite + Tailwind CSS
        ↓
Node.js + Express API
        ↓
MongoDB + Mongoose
        ↓
TMDB API (server-side only)
```

The browser never receives the TMDB API key. All external requests are proxied through the Express backend.

## Tech Stack

- **Frontend:** React 19, React Router, Axios, Tailwind CSS, Vite
- **Backend:** Node.js, Express 4
- **Database:** MongoDB, Mongoose
- **External API:** TMDB
- **Development:** ESM modules, environment-based configuration

## Getting Started

### Prerequisites

- Node.js 18+
- MongoDB
- A TMDB API key

### Installation

1. Clone the repository:

```bash
git clone <repository-url>
cd movie-discovery
```

2. Install dependencies:

```bash
npm run install:all
```

3. Create environment files from the examples:

```bash
cp .env.example .env
cp server/.env.example server/.env
```

4. Add your MongoDB URI and TMDB API key:

```env
PORT=4000
MONGODB_URI=mongodb://127.0.0.1:27017/movie-discovery
TMDB_API_KEY=your_tmdb_api_key_here
```

### Development

Run both the frontend and backend:

```bash
npm run dev
```

Or run them separately:

```bash
npm run dev:frontend
npm run dev:backend
```

The frontend runs on `http://localhost:5173`, and the API runs on `http://localhost:4000`. Vite proxies `/api` requests to the backend.

### Production Build

```bash
npm run build:frontend
```

The production build is generated in `frontend/dist`.

## API Endpoints

### Movies

- `GET /api/movies/trending?page=1`
- `GET /api/movies/popular?page=1`
- `GET /api/movies/top-rated?page=1`
- `GET /api/movies/upcoming?page=1`
- `GET /api/movies/search?q=<query>&page=1&sortBy=popularity`
- `GET /api/movies/:id`
- `GET /api/movies/:id/similar?page=1`

### Wishlist

- `GET /api/wishlist`
- `POST /api/wishlist`
- `DELETE /api/wishlist/:movieId`

## Project Structure

```text
.
├── frontend/
│   ├── src/
│   │   ├── components/
│   │   ├── hooks/
│   │   ├── pages/
│   │   ├── services/
│   │   ├── App.jsx
│   │   ├── main.jsx
│   │   └── index.css
│   ├── index.html
│   ├── package.json
│   ├── tailwind.config.js
│   └── vite.config.js
├── server/
│   ├── config/
│   ├── controllers/
│   ├── middleware/
│   ├── models/
│   ├── routes/
│   ├── services/
│   ├── utils/
│   └── server.js
├── .env.example
├── .gitignore
└── package.json
```

## Design

The application uses a cinematic dark color palette with gold and crimson accents, a display serif typeface for headings, responsive grid layouts, subtle hover transitions, and consistent spacing throughout the experience.

## AI Usage

This project was developed with the assistance of Claude Code, an AI coding assistant. AI assistance was used for:

- Project architecture and implementation planning
- Component and API design
- Writing and refactoring application code
- Identifying and resolving build errors
- Verifying responsive layout and accessibility considerations

All functionality, design decisions, and final code were reviewed and validated before delivery.

## Environment Variables

| Variable | Description |
| --- | --- |
| `PORT` | Backend server port (default: `4000`) |
| `MONGODB_URI` | MongoDB connection URI |
| `TMDB_API_KEY` | TMDB API key used only by the backend |

`.env` files are ignored by Git. Use `.env.example` and `server/.env.example` as templates.

## License

MIT
