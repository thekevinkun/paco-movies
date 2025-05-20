# 🎬 PacoMovies

**PacoMovies** is a modern movie and TV show discovery app powered by the [TMDB API](https://www.themoviedb.org/documentation/api). Search, explore, and watch trailers for your favorite content — from trending movies to the latest TV shows and stars — all in a fast, responsive UI.

🔗 Live Site: [https://paco-movies.vercel.app](https://paco-movies.vercel.app)

**Desktop**:

![Desktop Version](https://github.com/user-attachments/assets/f2dfd366-0251-4c70-a6e0-b20e61ad9b53)

**Tablet**:

![Tablet Version](https://github.com/user-attachments/assets/23f245d7-5f0a-4fe3-a07a-b0d65105ffa5)

**Mobile**:

![Mobile Version](https://github.com/user-attachments/assets/09e006bd-2f71-4b94-b3e4-0f56b7b6d522)

---

## ✨ Key Features

- 🔍 **Search everything** — Movies, TV shows, and people
- 🧭 **Explore by category** — Trending, Now Playing, Top Rated, Upcoming
- 🎬 **Global video player modal** — Watch trailers from anywhere in the app
- 🖼️ **Animated, responsive carousels** — Powered by `keen-slider`
- 🔄 **Infinite scroll** — Browse effortlessly with Framer Motion animations
- ⚡ **Blazing-fast performance** — Server-side Redis caching for API results
- 📱 Fully responsive — Works great on all screen sizes
- 🔗 (Coming Soon) Streaming availability links from TMDB’s watch providers

---

## 🛠️ Tech Stack

- [Next.js](https://nextjs.org/) — App Router, server components, API routes
- [TypeScript](https://www.typescriptlang.org/) — Strong typing and better DX
- [Tailwind CSS](https://tailwindcss.com/) — Utility-first styling
- [Framer Motion](https://www.framer.com/motion/) — Smooth page and grid animations
- [Keen Slider](https://keen-slider.io/) — Flexible, touch-friendly sliders
- [Redis](https://redis.io/) — Ultra-fast caching for paginated TMDB data
- [TMDB API](https://www.themoviedb.org/documentation/api) — Movies, shows, cast info, trailers, and more

---

## 📁 Folder Structure

app/

├── movies/             → Movie pages and routes

├── tv/                 → TV show routes

├── stars/              → Actor and person detail pages

├── components/         → Reusable UI components

├── context/            → Global modal context for video player

├── server/             → Server actions, caching, and API logic

├── types/              → Centralized TypeScript interfaces

├── lib/                → Utility functions

---

## 🧠 Lessons & Value

This project demonstrates full-stack skills using:

+ API integration and caching strategies

+ Context/state management for modals

+ Responsive UI design

+ Type-safe architecture for scalability

+ Performance optimization with Redis and selective API caching

It's built to be portfolio-quality and job-ready.

---

## 🧑‍💻 Getting Started

Follow these steps to run the app locally:

### 1. Clone the Repository
```bash
git clone https://github.com/your-username/paco-movies.git
cd paco-movies
```

### 2. Install Dependencies
```bash
npm install
# or
yarn install
```

### 3. Set Up Environment Variables
Create a .env.local file and add the following:
```bash
TMDB_API_KEY=your_tmdb_api_key_here
REDIS_URL=redis://localhost:6379
```
> [!TIP]
> You can get your TMDB API key from TMDB Account Settings.

### 4. Start Redis (for caching)
```bash
Install Redis from https://redis.io
```
> [!WARNING]
> The app can run without Redis, but caching will be disabled.

### 5. Start the Development Server
```bash
npm run dev
# or
yarn dev
```

---

## 🤝 Contributing
Contributions are welcome! If you'd like to suggest improvements or new features, feel free to open an issue or submit a PR.

## 📬 Contact
Want to connect or provide feedback?

📧 developer.kevinkun@gmail.com

🐙 GitHub [@thekevinkun](https://github.com/thekevinkun)

## 📄 License
This project is licensed under the MIT License.
