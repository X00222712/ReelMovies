<script>
  // Author: Alex D
  export let movie;
</script>
<div class="movie-card">
  <div class="poster-wrapper">
    <img src={movie.poster} alt={movie.title} />

    <div class="rating-badge">
      {movie.rating || movie.rating || "N/A"}
    </div>
    <div class="overlay">
      <a href={`/movies/${movie.id}`} class="btn btn-ticket">
        View Details
      </a>
    </div>
  </div>
  <div class="movie-info">
    <h5>{movie.title}</h5>
    <div class="genres">
      {#if movie.genres && movie.genres.length > 0}
        {#each movie.genres.slice(0, 2) as g}
          <span class="genre">{g}</span>
        {/each}
      {:else}
        <span class="genre">No Genre</span>
      {/if}
    </div>

  </div>

</div>
<style>

.movie-card {
  background: linear-gradient(145deg, rgba(28,37,65,0.85), rgba(11,19,43,0.85));
  backdrop-filter: blur(16px);
  border: 1px solid rgba(255,255,255,0.06);
  border-radius: 18px;
  overflow: hidden;
  transition: all 0.4s ease;
  position: relative;
}

.movie-card:hover {
  transform: translateY(-10px) scale(1.02);
  box-shadow: 0 30px 60px rgba(0,0,0,0.7);
}

.poster-wrapper {
  position: relative;
  overflow: hidden;
}

.poster-wrapper img {
  width: 100%;
  height: 340px;
  object-fit: cover;
  transition: transform 0.5s ease;
}

.movie-card:hover img {
  transform: scale(1.1);
}

.poster-wrapper::after {
  content: "";
  position: absolute;
  inset: 0;
  background: linear-gradient(
    to top,
    rgba(0,0,0,0.8),
    rgba(0,0,0,0.1)
  );
}

.overlay {
  position: absolute;
  inset: 0;
  display: flex;
  justify-content: center;
  align-items: center;
  opacity: 0;
  transition: 0.3s ease;
  z-index: 2;
}

.movie-card:hover .overlay {
  opacity: 1;
}

.rating-badge {
  position: absolute;
  top: 12px;
  right: 12px;
  background: var(--accent);
  padding: 5px 12px;
  border-radius: 30px;
  font-size: 0.75rem;
  font-weight: 600;
  color: white;
  z-index: 3;
}

.movie-info {
  padding: 1rem;
}

.movie-info h5 {
  color: #fff;
  font-size: 1.05rem;
  font-weight: 600;
  margin-bottom: 8px;
}

.genre {
  display: inline-block;
  font-size: 0.75rem;
  color: rgba(255,255,255,0.8);
  background: rgba(255,255,255,0.08);
  padding: 4px 10px;
  border-radius: 12px;
  margin-right: 4px;
}

.btn-ticket {
  background: var(--accent);
  border-radius: 30px;
  padding: 8px 20px;
  font-weight: 600;
  color: white;
  transition: all 0.3s ease;
}

.btn-ticket:hover {
  background: var(--accent-hover);
  transform: scale(1.05);
  box-shadow: 0 10px 25px rgba(108,99,255,0.5);
}
</style>