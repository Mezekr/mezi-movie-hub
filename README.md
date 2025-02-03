# Mezi-movie-Hub

### Mezi-movie-hub is a website that offers a sleek and modern experience for browsing and searching for movies.

Developed using the latest React.js 19 for the frontend, Appwrite to implement the treanding movie algorithm as backend services and styled with TailwindCSS.

## 🛠 Tech Stack

-   React.js (latest v19)
-   Appwrite
-   Tailwindcss (v4)
-   The Movie Database (TMDB) API

## 🔋 Features

➕ **Browse movies :** Discover a wide range of movies available on the platform.

➕ **Search for movies :** Easily find the movies you want with an optimized search function.

➕ **Trending Movies view:** Displays trending movies based on a dynamic algorithm.

➕ **Modern UI/UX:** A sleek and easy to browse interface designed for a great user experience.

➕ **Responsiveness:** Complete responsive design that works seamlessly across devices.

## Quickly try project locally

Follow these steps to setup the project locally:

**Prerequisites**
Make sure you have the following installed on your machine:

-   Git
-   Node.js
-   npm

**Step 1 - Clone the repository**

```bash
<<<<<<< HEAD
git  clone  https://github.com/
cd
=======
git  clone  git@github.com:Mezekr/mezi-movie-hub.git
cd mezi-movie-hub
>>>>>>> eac3136 (add project description, features & local setup)
```

**Step 2 - Installation**

Install the project dependencies using npm:

```bash
npm  install
```

**Step 3 - Set Up Environment Variables**

Create a new file named `.env.local` in the root of your project and add the following content:

```env
VITE_IMDB_API_KEY=

VITE_APPWRITE_PROJECT_ID=
VITE_APPWRITE_DATABASE_ID=
VITE_APPWRITE_COLLECTION_ID=
```

Replace the placeholder values with your actual **[TheMovieDatabase API](https://developer.themoviedb.org/reference/intro/getting-started)** and **[Appwrite](https://apwr.dev/JSM050)** credentials. You can obtain these credentials by signing up on the [TheMovieDatabase](https://developer.themoviedb.org/reference/intro/getting-started) and creating a new project on the [Appwrite](https://apwr.dev/JSM050)

**Step 4 - Running the Project**

```bash
npm  run  dev
```

Then, Open [http://localhost:5173](http://localhost:5173) in your browser to view the project.
