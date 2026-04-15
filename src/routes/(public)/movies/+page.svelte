<!-- Author: Alex D -->

<!--Below is just test data made measy for me to shnow Mary the card crud -->
<!--{
  title: "Parasite",
  rating: "PG-13",
  poster: "https://image.tmdb.org/t/p/w500/7IiTTgloJzvGI1TAYymCfbfl3vT.jpg",
  description: "A poor family schemes to become employed by a wealthy household by infiltrating their lives, but their deception leads to unexpected and shocking consequences.",
  ratingScore: 8.6
}-->
<script>
  import MovieCard from '$lib/components/MovieCard.svelte';

  let { data } = $props();

  let search = $state("");
  let selectedGenre = $state("All");
  let selectedRating = $state("All");

  let movies = data.movies;

  const genres = ["All", ...data.genres];

  const ratings = ["All","G","PG","PG-13","R"];

  let filteredMovies = $derived(
    movies.filter((movie) => {

      const matchesSearch =
        movie.title.toLowerCase().includes(search.toLowerCase());

      const matchesGenre =
        selectedGenre === "All" ||
        movie.genres?.includes(selectedGenre);

      const matchesRating =
        selectedRating === "All" ||
        movie.rating === selectedRating;

      return matchesSearch && matchesGenre && matchesRating;
    })
  );
</script>

<div class="container py-5">
  <h2 class="mb-4">Movies</h2>
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
