<script>
  import MovieCard from '$lib/components/MovieCard.svelte';

  let search = "";
  let selectedGenre = "All";
  let selectedRating = "All";

  // Mock data (replace later with DB)
  let movies = [
  {
    id: 1,
    title: "Interstellar",
    genre: "Sci-Fi",
    rating: "PG-13",
    poster: "https://image.tmdb.org/t/p/w500/rAiYTfKGqDCRIIqo664sY9XZIvQ.jpg"
  },
  {
    id: 2,
    title: "The Batman",
    genre: "Action",
    rating: "PG-13",
    poster: "https://image.tmdb.org/t/p/w500/74xTEgt7R36Fpooo50r9T25onhq.jpg"
  },
  {
    id: 3,
    title: "Coco",
    genre: "Animation",
    rating: "G",
    poster: "https://image.tmdb.org/t/p/w500/gGEsBPAijhVUFoiNpgZXqRVWJt2.jpg"
  }
];

  const genres = ["All", "Action", "Sci-Fi", "Animation"];
  const ratings = ["All", "G", "PG", "PG-13", "R"];

  $: filteredMovies = movies.filter((movie) => {
    const matchesSearch =
      movie.title.toLowerCase().includes(search.toLowerCase());

    const matchesGenre =
      selectedGenre === "All" || movie.genre === selectedGenre;

    const matchesRating =
      selectedRating === "All" || movie.rating === selectedRating;

    return matchesSearch && matchesGenre && matchesRating;
  });
</script>

<div class="container py-5">

  <h2 class="mb-4">Movies</h2>

  <!-- Search + Filters -->
  <div class="row g-3 mb-4">

    <div class="col-md-4">
      <input
        type="text"
        class="form-control"
        placeholder="Search movies..."
        bind:value={search}
      />
    </div>

    <div class="col-md-3">
      <select
        class="form-select"
        bind:value={selectedGenre}
      >
        {#each genres as genre}
          <option>{genre}</option>
        {/each}
      </select>
    </div>

    <div class="col-md-3">
      <select
        class="form-select"
        bind:value={selectedRating}
      >
        {#each ratings as rating}
          <option>{rating}</option>
        {/each}
      </select>
    </div>

  </div>

  <!-- Movie Grid -->
  <div class="row g-4">
    {#if filteredMovies.length > 0}
      {#each filteredMovies as movie}
        <div class="col-6 col-md-4 col-lg-3">
          <MovieCard {movie} />
        </div>
      {/each}
    {:else}
      <p>No movies found.</p>
    {/if}
  </div>
</div>

<style>

</style>
