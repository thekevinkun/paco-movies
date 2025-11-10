# 🎬 PacoMovies

**Paco Movies** is a modern movie and TV show discovery app powered by the [TMDB API](https://www.themoviedb.org/documentation/api). Search, explore, and watch trailers for your favorite content — from trending movies to the latest TV shows and stars — all in a fast, responsive UI.

<img width="300" height="300" alt="paco-movies-icon" src="https://github.com/user-attachments/assets/aec999bc-77ef-40d1-9839-141948fb6d48" /><br/>

Live Demo: [https://pacomovies.vercel.app](https://pacomovies.vercel.app)

---

## 🚀 Features

- 🔍 **Search movies, TV shows, and people** with real-time results
- 🎥 **Watch trailers** in a global video modal
- 🖼️ **Responsive carousels** for trending media using `keen-slider`
- 🔄 **Infinite scroll** with animated grid layout (Framer Motion)
- 🧠 **TypeScript-first** for type safety and maintainability
- ⚡ **Redis caching** for paginated TMDB API data (Next.js Route Handlers + server actions)
- 📱 Fully responsive design optimized for all devices

---

## 🛠️ Built With

- [Next.js](https://nextjs.org/) – App Router, SSR/CSR rendering
- [React](https://reactjs.org/)
- [TypeScript](https://www.typescriptlang.org/)
- [Tailwind CSS](https://tailwindcss.com/)
- [Framer Motion](https://www.framer.com/motion/) – smooth animations
- [Keen Slider](https://keen-slider.io/) – responsive carousels
- [TMDB API](https://www.themoviedb.org/documentation/api) – movie, TV, and person data
- **Redis** – high-performance in-memory cache to reduce API calls and speed up paginated content loading

---

## 📁 Project Structure

```
app/
  ├── movies/             → Movie listing and details pages
  ├── tv/                 → TV show listing and details pages
  ├── stars/              → Person/stars pages
  ├── components/         → Reusable UI components
  ├── context/            → Global video modal context
  ├── lib/                → Utility functions and API helpers
  ├── types/              → TypeScript interfaces
  ├── api/                → Route handlers (App Router)
```

---

## 🧠 Lessons & Value

This project demonstrates full-stack skills using:

- API integration and caching strategies

- Context/state management for modals

- Responsive UI design

- Type-safe architecture for scalability

- Performance optimization with Redis and selective API caching

- It's built to be portfolio-quality and job-ready.

---

## 🧑‍💻 Getting Started

### 1. Clone the repo
```bash
git clone https://github.com/your-username/paco-movies.git
cd paco-movies
```

### 2. Install dependencies

```bash
npm install
# or
yarn install
```

### 3. Environment Variables

Create a `.env.local` file in the root:

```env
TMDB_API_KEY=your_tmdb_api_key_here
```

### 4. Start Redis (Optional, for caching support)
Make sure Redis is running locally:

```bash
docker run -p 6379:6379 redis4
```

Or install Redis manually from https://redis.io
 and run it in the background.

In your .env.local, set:

```bash
REDIS_URL=redis://localhost:6379
```

### 5. Run the development server

```bash
npm run dev
# or
yarn dev
```

Then open [http://localhost:3000](http://localhost:3000) in your browser.

---

## 📸 Screenshots

> Desktop Version
  <img width="679" height="506" alt="Desktop Version" src="https://github.com/user-attachments/assets/f01bfdd0-6161-44df-8c95-25dc3422a0b7" />

> Mobile Version
  <img width="239" height="506" alt="Mobile Version" src="https://github.com/user-attachments/assets/f2ccb44f-d10f-445d-a395-7cbbb5f5666b" />

---

## 🤝 Contributing

Pull requests are welcome! For major changes, please open an issue first to discuss what you’d like to add or improve.

## 📄 License

MIT License. See LICENSE file for details.
