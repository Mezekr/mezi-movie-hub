import { Client, Databases, ID, Query } from 'appwrite';

const PROJECT_ID = import.meta.env.VITE_APPWRITE_PROJECT_ID;
const DATABASE_ID = import.meta.env.VITE_APPWRITE_DATABASE_ID;
const COLLECTION_ID = import.meta.env.VITE_APPWRITE_COLLECTION_ID;

const client = new Client();

client.setEndpoint('https://cloud.appwrite.io/v1').setProject(PROJECT_ID);

const databases = new Databases(client);

export const updateSearchCount = async (searchTerm, movie) => {
	// 1.use Appwrite SDK to check if search team exists in database
	try {
		const result = await databases.listDocuments(
			DATABASE_ID,
			COLLECTION_ID,
			[Query.equal('searchTerm', searchTerm)]
		);

		// 2. if exists update search team count by 1
		if (result.documents.length > 0) {
			const doc = result.documents[0];
			await databases.updateDocument(
				DATABASE_ID,
				COLLECTION_ID,
				doc.$id,
				{ count: doc.count + 1 }
			);

			// 3. if doesn't exist create a new document with search team and count by 1
		} else {
			await databases.createDocument(
				DATABASE_ID,
				COLLECTION_ID,
				ID.unique(),
				{
					searchTerm,
					count: 1,
					movie_id: movie.id,
					poster_url: `https://image.tmdb.org/t/p/w500/${movie.poster_path}`,
				}
			);
		}
	} catch (error) {
		console.error(error.message);
	}

	// console.log(PROJECT_ID, DATABASE_ID, COLLECTION_ID);
};
