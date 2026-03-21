<script>
  import MovieCard from '$lib/components/MovieCard.svelte';

  let search = $state("");
  let selectedGenre = $state("All");
  let selectedRating = $state("All");

  let {data} = $props();

  // replace with requests to POST
  let movies = data.movies
  console.log(movies)

  const genres = ["All", "Action", "Sci-Fi", "Animation"];
  const ratings = ["All", "G", "PG", "PG-13", "R"];

  let filteredMovies = $derived(movies.filter((movie) => {
    const matchesSearch =
        movie.title.toLowerCase().includes(search.toLowerCase());

    const matchesGenre =
        selectedGenre === "All" || movie.genre === selectedGenre;

    const matchesRating = 
        selectedRating === "All" || movie.ageRating === selectedRating;

    return matchesSearch && matchesGenre && matchesRating;
  }));
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
