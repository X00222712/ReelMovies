// Author: Alex D
import { moviesService } from '$lib/server/services/movie-service';

export async function load() {
  // Use shared moviesService (uses the same DB as admin actions)
  const results = await moviesService.getAllMovies();

  // Normalize to shape expected by the UI (rating, genres)
  const moviesList = results.map(m => ({
    id: m.id,
    title: m.title,
    rating: m.ageRating || m.rating || 'N/A',
    poster: m.poster,
    genres: m.genre || m.genres || []
  }));

  // Build genre list
  const genreSet = new Set();
  for (const m of moviesList) (m.genres || []).forEach(g => genreSet.add(g));

  return {
    movies: moviesList,
    genres: ['All', ...Array.from(genreSet).sort()]
  };
}