// Author: Alex D
import { error } from "@sveltejs/kit";
import { moviesService } from '$lib/server/services/movie-service';
import { genreService } from "$lib/server/services/genre-service";

export async function load({ params }) {
  const movie = await moviesService.getMovieById(Number(params.id));

  if (!movie) {
    throw error(404, "Movie not found");
  }

  return { movie };
}
