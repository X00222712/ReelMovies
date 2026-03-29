// Author: Alex D
import { json } from "@sveltejs/kit";
import { runTest, TestCase } from "$lib/server/utils/tests";

// DB
import { db } from "$lib/server/db/db";
import { movies, genres, movieGenres } from "$lib/server/db/schema";
import { eq } from "drizzle-orm";

export async function GET() {

  let testData = [

    // search by title 'Interstellar'
    new TestCase({ search: "interstellar", genre: "All", rating: "All" },["Interstellar"]),

    // search by title 'The'
    new TestCase({ search: "the", genre: "All", rating: "All" },
        ["The Shawshank Redemption", "The Godfather", "The Dark Knight", "The Lord of the Rings: The Return of the King", "The Matrix", "The Silence of the Lambs", "The Lion King", "The Pokemon Movie: I Choose You!", "Art of the Devil", "The Exorcist", "The Conjuring", "The Wolf of Wall Street", "The Batman", "Black Panther", "Guardians of the Galaxy"]),

    // filter by genre 'Action'
    new TestCase({ search: "", genre: "Action", rating: "All" },
        ["The Dark Knight", "The Matrix", "The Batman", "Avengers: Endgame", "Black Panther", "Guardians of the Galaxy"]),
    
    // filter by genre 'Animation'
    new TestCase({ search: "", genre: "Animation", rating: "All" },
        ["My Neighbor Totoro", "Spirited Away", "The Lion King", "Toy Story", "Finding Nemo", "The Pokemon Movie: I Choose You!", "Your Name", "Coco"]),

    // filter by genre 'Musical'
    new TestCase({ search: "", genre: "Musical", rating: "All" }, ["No movies found."]),

    // filter by genre 'Crime'
    new TestCase({ search: "", genre: "Crime", rating: "All" }, ["Pulp Fiction", "The Silence of the Lambs", "The Batman"]),

     // filter by genre 'Romance'
    new TestCase({ search: "", genre: "Romance", rating: "All" }, ["Forrest Gump", "Your Name"]),

    // filter by rating 'R'
    new TestCase({ search: "", genre: "All", rating: "R" },
         ["The Shawshank Redemption", "The Godfather", "Pulp Fiction", "Fight Club", "The Matrix", "The Silence of the Lambs", "Art of the Devil", "The Exorcist", "The Conjuring", "The Wolf of Wall Street"]),

     // filter by rating 'G'
    new TestCase({ search: "", genre: "All", rating: "G" },
         ["My Neighbor Totoro", "The Lion King", "Toy Story", "Finding Nemo"]),

    // search + filter combined correctly - search 'batman', genre 'Action', rating 'PG-13'
    new TestCase({ search: "batman", genre: "Action", rating: "PG-13" }, ["The Batman"]),

    // search + filter combined incorrectly - search 'batman', genre 'Animation', rating 'PG-13'
    new TestCase({ search: "batman", genre: "Animation", rating: "PG-13" }, ["No movies found."]),

    // no results
    new TestCase({ search: "randommovie", genre: "All", rating: "All" }, ["No movies found."]),

  ];

  let testResult = await runTest(testData, async (filters) => {

    const { search, genre, rating } = filters;

    const result = await db
      .select({
        id: movies.id,
        title: movies.title,
        rating: movies.rating,
        genre: genres.name
      })
      .from(movies)
      .leftJoin(movieGenres, eq(movies.id, movieGenres.movieId))
      .leftJoin(genres, eq(movieGenres.genreId, genres.id));

    const movieMap = {};

    for (const row of result) {
      if (!movieMap[row.id]) {
        movieMap[row.id] = {
          title: row.title,
          rating: row.rating,
          genres: []
        };
      }

      if (row.genre) {
        movieMap[row.id].genres.push(row.genre);
      }
    }

    const moviesList = Object.values(movieMap);
    const filtered = moviesList.filter((movie) => {

      const matchesSearch =
        movie.title.toLowerCase().includes(search.toLowerCase());

      const matchesGenre =
        genre === "All" || movie.genres.includes(genre);

      const matchesRating =
        rating === "All" || movie.rating === rating;

      return matchesSearch && matchesGenre && matchesRating;
    });

    const data = filtered.map(m => {return m.title})
    if (0 === data.length)
      { return "No movies found." }

    return data;
  },
  (expected, result) => {
    let passed = true
    expected.forEach(element => {
      if (!result.includes(element)) passed = false
    });
    return passed
  });


  return json(
    { name: "movieSearchTest", data: testResult },
    { status: 200 }
  );
}