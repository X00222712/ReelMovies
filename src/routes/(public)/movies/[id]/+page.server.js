// Author: Alex D
import { error } from "@sveltejs/kit";
import { getMovieById } from '$lib/server/services/movie-service';

export async function load({ params }) {
  const movie = await getMovieById(Number(params.id));

  if (!movie) {
    throw error(404, "Movie not found");
  }

  return { movie };
}
