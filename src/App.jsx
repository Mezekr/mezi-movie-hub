import { useEffect, useState } from 'react';
import { useDebounce } from 'react-use';
import { getTrendingMovies, updateSearchCount } from './appwrite';
import MovieCard from './components/MovieCard';
import Search from './components/Search';
import Spinner from './components/Spinner';

const API_KEY = import.meta.env.VITE_TMDB_API_KEY;

const API_BASE_URL = 'https://api.themoviedb.org/3';

const API_OPTIONS = {
	method: 'GET',
	headers: {
		accept: 'application/json',
		Authorization: `Bearer ${API_KEY}`,
	},
};
const App = () => {
	const [searchTerm, setSearchTerm] = useState('');
	const [errorMessage, setErrorMessage] = useState('');
	const [movieList, setMovieList] = useState([]);
	const [isLoading, setIsLoading] = useState(false);
	const [debouncedSearchTerm, setDebouncedSearchTerm] = useState('');
	const [trendingMovies, setTrendingMovies] = useState([]);

	useDebounce(() => setDebouncedSearchTerm(searchTerm), 1000, [searchTerm]);

	const fetchMovies = async (query = '') => {
		setIsLoading(true);
		setErrorMessage('');

		try {
			const endpoint = query
				? `https://api.themoviedb.org/3/search/movie?query=${encodeURIComponent(
						query
				  )}`
				: `${API_BASE_URL}/discover/movie?sort_by=popularity.desc`;

			const response = await fetch(endpoint, API_OPTIONS);

			if (!response.ok) {
				throw new Error('Failed to fetch movies');
			}
			const data = await response.json();

			if (data.Response === 'False') {
				setErrorMessage(data.error || 'Failed to fetch movies');
				setMovieList([]);
				return;
			}
			// console.log(data);
			setMovieList(data.results || []);

			if (query && data.results.length > 0) {
				await updateSearchCount(query, data.results[0]);
			}
		} catch (error) {
			console.error(`Error fetching Movie: ${error}`);
			setErrorMessage(`Error fetching Movies. Please try again.`);
		} finally {
			setIsLoading(false);
		}
	};

	const loadTreandingMovies = async () => {
		try {
			const movies = await getTrendingMovies();
			setTrendingMovies(movies);
		} catch (error) {
			console.error(`Error fetching trending movies: ${error}`);
		}
	};

	useEffect(() => {
		fetchMovies(debouncedSearchTerm);
	}, [debouncedSearchTerm]);

	useEffect(() => {
		loadTreandingMovies();
	}, []);

	return (
		<main>
			<div className="pattern" />
			<div className="wrapper">
				<header>
					<img src="./hero.png" alt="Hero Banner" />
					<h1>
						Find <span className="text-gradient">Movies </span>
						you will enjoy without a Hassel!
					</h1>
					<Search
						searchTerm={searchTerm}
						setSearchTerm={setSearchTerm}
					/>
				</header>
				<section className="all-movies">
					<h2 className="mt-[40px] mx-auto">All Movies</h2>

					{isLoading ? (
						<Spinner />
					) : errorMessage ? (
						<p className="text-red-500">{errorMessage}</p>
					) : (
						<ul>
							{movieList.map((movie) => (
								<MovieCard key={movie.id} movie={movie} />
							))}
						</ul>
					)}
				</section>
			</div>
		</main>
	);
};

export default App;
