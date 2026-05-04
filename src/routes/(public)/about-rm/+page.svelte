<!-- Author: Alex D -->
<script>
  let selectedMember = null;
</script>

<div class="about-container">
  <h2 class="text-center mb-4">About Reel Movies</h2>
  <div class="about-card">
    <p class="about-text">
      Welcome to <strong>Reel Movies</strong>, your ultimate destination for all movies.

      We are passionate about bringing you the latest films, screenings, and competitive
      prices from the world of movie cinemas.

      Whether you're a casual moviegoer or a die-hard film enthusiast,
      <strong>Reel Movies</strong> is here to keep you entertained.
    </p>

    <p>We focus on deverse and pleasurable viewing experiences. Allowing for easy booking and browsing while at home</p>

  </div>
</div>

<style>

.about-container {
  max-width: 750px;
  margin: auto;
  padding: 3rem 1rem;
}

h2 {
  color: #ffffff;
  font-weight: 600;
}

.about-card {
  background: rgba(28, 37, 65, 0.75);
  backdrop-filter: blur(14px);
  border: 1px solid rgba(255,255,255,0.06);
  border-radius: 18px;
  padding: 2rem;
  text-align: center;
}

.about-text {
  color: rgba(255,255,255,0.85);
  line-height: 1.7;
  margin-bottom: 2rem;
}

.team-section h5 {
  color: #ffffff;
  margin-bottom: 1rem;
}

.team-grid {
  display: flex;
  justify-content: center;
  gap: 15px;
  flex-wrap: wrap;
}
.team-member {
  appearance: none;
  -webkit-appearance: none;
  -moz-appearance: none;
  background: rgba(11,19,43,0.75);
  border: 1px solid rgba(255,255,255,0.08);
  border-radius: 10px;
  padding: 8px 16px;
  color: #ffffff;
  cursor: pointer;
  transition: 0.25s ease;
  font: inherit;
  display: inline-flex;
  align-items: center;
  justify-content: center;
}

.team-member:hover,
.team-member:focus-visible {
  border-color: var(--accent);
  transform: translateY(-2px);
}

.team-member:focus-visible {
  box-shadow: 0 0 0 3px rgba(100,150,255,0.15);
}


.member-info {
  margin-top: 1.5rem;
  background: rgba(11,19,43,0.6);
  border-radius: 12px;
  padding: 1rem;
  border: 1px solid rgba(255,255,255,0.08);
}

.member-info h6 {
  color: #ffffff;
  margin-bottom: 5px;
}

.member-info p {
  color: rgba(255,255,255,0.8);
  font-size: 0.9rem;
}

</style>
