// Author: Alex D
import { moviesService } from "$lib/server/services/movie-service";
import { error } from "@sveltejs/kit";

export async function load({ params }) {
  const movies = await moviesService.getAllMovies();

  const movie = movies.find(m => m.id === Number(params.id));

  if (!movie) {
    throw error(404, "Movie not found");
  }

  return { movie };
}