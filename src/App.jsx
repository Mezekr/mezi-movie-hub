import { useEffect, useState } from 'react';
import Search from './components/Search';

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

	const fetchMovies = async () => {
		setIsLoading(true);
		setErrorMessage('');

		try {
			const endpoint = `${API_BASE_URL}/discover/movie?sort_by=popularity.desc`;

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
			console.log(data);
			setMovieList(data.result || []);
		} catch (error) {
			console.error(`Error fetching Movie: ${error}`);
			setErrorMessage(`Error fetching Movies. Please try again.`);
		} finally {
			setIsLoading(false);
		}
	};

	useEffect(() => {
		fetchMovies();
	}, []);
	return (
		<>
			<main>
				<div className="pattern"> </div>
				<div className="wrapper">
					<header>
						<img src="./hero.png" alt="Hero Banner" />
						<h1>
							Find <span className="text-gradient">Movies </span>
							you will enjoy without a Hassel !
						</h1>
						<Search
							searchTerm={searchTerm}
							setSearchTerm={setSearchTerm}
						/>
					</header>
					<section>
						<h1>All Movies</h1>
						{errorMessage && (
							<p className="text-red-500">{errorMessage}</p>
						)}
					</section>
				</div>
			</main>
		</>
	);
};

export default App;
