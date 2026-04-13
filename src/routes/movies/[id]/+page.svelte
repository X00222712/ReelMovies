<!-- Author: Alex D -->
<script>
  let { data } = $props();

  const movie = data.movie;

</script>

{#if movie}
  <h1>{movie.title}</h1>
{:else}
  <p style="color:white;">Movie not found</p>
{/if}

<div class="details-container">

  <div class="details-card">

    <div class="poster">
      <img src={movie.poster} alt={movie.title} />
    </div>

    <div class="info">

      <h1>{movie.title}</h1>

      <div class="meta">
        <span class="badge">{movie.ageRating}</span>
        <span class="rating"> {movie.ratingScore ? `${movie.ratingScore}/10` : 'N/A'}</span>
      </div>

      {#if movie.genre && movie.genre.length}
        <div class="genres">
          {#each movie.genre as g}
            <span class="genre-pill">{g}</span>
          {/each}
        </div>
      {/if}

      <p class="description">
        {movie.description}
      </p>

      <div class="actions">
        <a href="/movies" class="back-btn">← Back to Movies</a>
        <a href={'/purchase/tickets?movie=' + (movie.title)} class="book-btn">Book tickets →</a>
      </div>

    </div>

  </div>

</div>

<style>

.details-container {
  padding: 4rem 1rem;
  display: flex;
  justify-content: center;
}

.details-card {
  display: grid;
  grid-template-columns: 300px 1fr;
  gap: 2rem;
  max-width: 900px;
  background: rgba(28, 37, 65, 0.8);
  border-radius: 20px;
  padding: 2rem;
  backdrop-filter: blur(16px);
  border: 1px solid rgba(255,255,255,0.05);
}

.poster img {
  width: 100%;
  border-radius: 12px;
}

.info h1 {
  color: white;
  margin-bottom: 10px;
}

.meta {
  display: flex;
  gap: 1rem;
  margin-bottom: 1rem;
}

.badge {
  background: var(--accent);
  padding: 5px 12px;
  border-radius: 20px;
  color: white;
}

.rating {
  color: #ffd166;
  font-weight: 600;
}

.genres {
  margin-bottom: 1rem;
}

.genre-pill {
  display: inline-block;
  margin: 4px;
  padding: 5px 10px;
  border-radius: 10px;
  background: rgba(255,255,255,0.1);
  color: white;
  font-size: 0.8rem;
}

.description {
  color: rgba(255,255,255,0.8);
  line-height: 1.5;
  margin-top: 1rem;
}

.back-btn {
  display: inline-block;
  background: var(--accent);
  color: #ffffff;
  padding: 8px 14px;
  border-radius: 8px;
  text-decoration: none;
  font-weight: 700;
}

.back-btn:hover {
  text-decoration: underline;
}

.actions {
  display: flex;
  gap: 1rem;
  margin-top: 1.5rem;
}

.book-btn {
  display: inline-block;
  background: var(--accent);
  color: #ffffff;
  padding: 8px 14px;
  border-radius: 8px;
  text-decoration: none;
  font-weight: 700;
}

.book-btn:hover {
  text-decoration: underline;
}

@media (max-width: 768px) {
  .details-card {
    grid-template-columns: 1fr;
  }
}

</style>