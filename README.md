# 🎬 Movie Explorer



A full-stack movie discovery app where users can search movies, browse by
category (top rated / popular / trending), and save favorites and a
watchlist to their account.


**[Live Demo →](https://movie-explorer-tau-gules.vercel.app/)**

<img width="1513" height="755" alt="Screenshot 2026-09-20 100706" src="https://github.com/user-attachments/assets/b146ce02-7d44-435a-afd1-8f9804dd7442" />

<img width="1530" height="763" alt="Screenshot 2026-09-20 115258" src="https://github.com/user-attachments/assets/9a0a7b6d-7573-45cd-b3b5-b961e322c2e3" />















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
git clone https://github.com/Shumail-Gul/movie-explorer.git
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
