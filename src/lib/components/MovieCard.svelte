<script>
  export let movie;
</script>

<div class="card h-100 movie-card">
  <img
    src={movie.poster}
    class="card-img-top"
    alt={movie.title}
  />

  <div class="card-body d-flex flex-column">
    <h6 class="card-title">{movie.title}</h6>

    <p class="text-muted small mb-2">
      {movie.genre} • {movie.rating}
    </p>

    <button class="btn btn-sm btn-primary mt-auto">
      View Details
    </button>
  </div>
</div>

<style>
  .movie-card {
    transition: transform 0.2s ease, box-shadow 0.2s ease;
  }

  .movie-card:hover {
    transform: translateY(-4px);
    box-shadow: 0 8px 20px rgba(0,0,0,0.2);
  }

  img {
    height: 320px;
    object-fit: cover;
  }
</style>