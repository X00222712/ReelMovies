//  Author: Alex D
import { moviesService } from "$lib/server/services/movie-service";
import { json } from "@sveltejs/kit";

export async function GET({ url }) {

  const type = url.searchParams.get("type");

  let movies = await moviesService.getAllMovies();

  if (type === "recommended") {
    movies = movies.slice(0, 5).map((movie, i) => ({
      ...movie,
      active: i === 0
    }));
  }

  return json({ movies }, { status: 200 });
}