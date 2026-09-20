# 🎬 Movie Explorer

A full-stack movie discovery app where users can search movies, browse by
category (top rated / popular / trending), and save favorites and a
watchlist to their account.

**[Live Demo →](https://movie-explorer-tau-gules.vercel.app/)**

![screenshot](./screenshot.png)

## Features
- Search movies with debounced live results
- Browse Top Rated, Popular, and Trending categories
- User authentication (signup/login with JWT)
- Add/remove favorites and watchlist, synced per user
- Movie details page with trailer embed and similar movies
- Fully responsive UI

## Tech Stack
**Frontend:** React, React Router, React Hook Form, Bootstrap
**Backend:** Django REST Framework, JWT authentication
**External API:** TMDB (The Movie Database)
**Deployment:** Vercel (frontend), Render (backend)

## Running locally

### Frontend
\`\`\`
git clone https://github.com/YOUR_USERNAME/movie-explorer.git
cd movie-explorer
npm install
cp .env.example .env   # set VITE_API_URL
npm run dev
\`\`\`

### Backend
\`\`\`
cd backend
python -m venv venv
source venv/bin/activate   # venv\\Scripts\\activate on Windows
pip install -r requirements.txt
cp .env.example .env   # set TMDB_ACCESS_TOKEN and SECRET_KEY
python manage.py migrate
python manage.py runserver
\`\`\`

## License
MIT
