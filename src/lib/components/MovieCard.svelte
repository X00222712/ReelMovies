<script>
  export let movie;
</script>

<div class="movie-card">

  <div class="poster-wrapper">
    <img src={movie.poster} alt={movie.title} />
    <div class="rating-badge">
      {movie.rating}
    </div>
    <div class="overlay">
      <a href="/tickets" class="btn btn-ticket">Book Tickets</a>
    </div>
  </div>
  <div class="movie-info">
    <h5>{movie.title}</h5>
    <span class="genre">{movie.genre}</span>
  </div>
</div>

<style>

.movie-card {
  background: rgba(28, 37, 65, 0.75);
  backdrop-filter: blur(14px);
  border: 1px solid rgba(255,255,255,0.06);
  border-radius: 16px;
  overflow: hidden;
  transition: all 0.35s ease;
}

.movie-card:hover {
  transform: translateY(-8px);
  box-shadow: 0 25px 45px rgba(0,0,0,0.5);
}

.poster-wrapper {
  position: relative;
  overflow: hidden;
}

.poster-wrapper img {
  width: 100%;
  height: 340px;
  object-fit: cover;
  transition: transform 0.4s ease;
}

.movie-card:hover img {
  transform: scale(1.08);
}

.overlay {
  position: absolute;
  inset: 0;
  background: rgba(0,0,0,0.55);
  display: flex;
  justify-content: center;
  align-items: center;
  opacity: 0;
  transition: 0.3s ease;
}

.movie-card:hover .overlay {
  opacity: 1;
}

.rating-badge {
  position: absolute;
  top: 10px;
  right: 10px;
  background: var(--accent);
  padding: 4px 10px;
  border-radius: 20px;
  font-size: 0.75rem;
  font-weight: 600;
  color: white;
}

.movie-info {
  padding: 1rem;
}

.movie-info h5 {
  color: #ffffff;
  font-size: 1rem;
  font-weight: 600;
  margin-bottom: 6px;
}

.genre {
  font-size: 0.8rem;
  color: rgba(255,255,255,0.7);
  background: rgba(255,255,255,0.05);
  padding: 3px 8px;
  border-radius: 8px;
}

.btn-ticket {
  border-radius: 30px;
  font-weight: 600;
  padding: 8px 18px;
  transition: 0.3s ease;
}

.btn-ticket:hover {
  transform: translateY(-2px);
  box-shadow: 0 10px 20px rgba(108,99,255,0.35);
}

</style>