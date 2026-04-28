<script>
	const { data, form } = $props();

	let selectedMovieId = $state('');
	let selectedScreeningId = $state('');
	let selectedSeats = $state([]);

	let movies = $derived.by(() => {
		const movieMap = new Map();

		for (const screening of data.screenings) {
			if (!movieMap.has(screening.movieId)) {
				movieMap.set(screening.movieId, {
					id: screening.movieId,
					title: screening.movieTitle
				});
			}
		}

		return Array.from(movieMap.values());
	});

	let movieScreenings = $derived.by(() => {
		return data.screenings.filter(
			(screening) => String(screening.movieId) === String(selectedMovieId)
		);
	});

	let selectedScreening = $derived(
		data.screenings.find((screening) => String(screening.id) === String(selectedScreeningId))
	);

	const seatPrices = {
		S: 5.99,
		R: 7.99,
		V: 9.99,
		D: 5.99
	};

	function movieChanged() {
		selectedScreeningId = '';
		selectedSeats = [];
	}

	function timeChanged() {
		selectedSeats = [];
	}

	function seatTaken(row, col) {
		return selectedScreening?.takenSeats.includes(`${row},${col}`);
	}

	function seatSelected(row, col) {
		return selectedSeats.includes(`${row},${col}`);
	}

	function selectSeat(row, col) {
		const seat = `${row},${col}`;

		if (seatTaken(row, col)) return;

		if (seatSelected(row, col)) {
			selectedSeats = selectedSeats.filter((selectedSeat) => selectedSeat !== seat);
		} else {
			selectedSeats = [...selectedSeats, seat];
		}
	}

	let totalPrice = $derived.by(() => {
		if (!selectedScreening) return 0;

		let total = 0;

		for (const seat of selectedSeats) {
			const [row, col] = seat.split(',').map(Number);
			const seatType = selectedScreening.screenSeats[row][col];
			total += seatPrices[seatType] ?? 0;
		}

		return total.toFixed(2);
	});
</script>

<div class="booking-page">
	<section class="booking-header">
		<p class="eyebrow">Reel Movies</p>
		<h1>Book Tickets</h1>
		<p>Choose your movie, pick a showing, select your seats, then continue to payment.</p>
	</section>

	{#if form?.message}
		<p class="alert alert-danger booking-alert">{form.message}</p>
	{/if}

	<form method="POST" action="?/book">
		<section class="booking-panel">
			<div class="selector-grid">
				<div>
					<label class="form-label" for="movie">Movie</label>
					<select
						id="movie"
						class="form-select"
						bind:value={selectedMovieId}
						onchange={movieChanged}
						required
					>
						<option value="">Select movie</option>

						{#each movies as movie}
							<option value={movie.id}>{movie.title}</option>
						{/each}
					</select>
				</div>

				<div>
					<label class="form-label" for="screening">Date and time</label>
					<select
						id="screening"
						class="form-select"
						name="screeningId"
						bind:value={selectedScreeningId}
						onchange={timeChanged}
						required
						disabled={!selectedMovieId}
					>
						<option value="">Select date and time</option>

						{#each movieScreenings as screening}
							<option value={screening.id}>
								{screening.date} at {screening.time} - {screening.screenName}
							</option>
						{/each}
					</select>
				</div>
			</div>
		</section>

		{#if selectedScreening}
			<section class="movie-preview">
				<img
					src={selectedScreening.poster}
					alt="{selectedScreening.movieTitle} poster"
					class="movie-poster"
				/>

				<div class="movie-info">
					<p class="eyebrow">{selectedScreening.date} at {selectedScreening.time}</p>
					<h2>{selectedScreening.movieTitle}</h2>

					<div class="movie-meta">
						<span>{selectedScreening.screenName}</span>
						<span>{selectedScreening.ageRating}</span>
						<span>{selectedScreening.ratingScore ?? 'N/A'} / 10</span>
					</div>

					<p>{selectedScreening.description}</p>
				</div>
			</section>

			<section class="seat-section">
				<div class="section-heading">
					<h2>Select Seats</h2>
					<p>{selectedSeats.length} selected</p>
				</div>

				<div class="screen-label">Screen</div>

				<div class="seat-map">
					{#each selectedScreening.screenSeats as row, i}
						<div class="seat-row">
							<span class="row-label">{i + 1}</span>

							{#each row as seat, j}
								<button
									type="button"
									value="{i},{j}"
									class="seat seat-{seat.toLowerCase()} {seatTaken(i, j) ? 'seat-taken' : ''}"
									class:selected={seatSelected(i, j)}
									onclick={() => selectSeat(i, j)}
									aria-label="row {i + 1} column {j + 1}"
								></button>
							{/each}
						</div>
					{/each}
				</div>

				<div class="seat-key">
					<div><span class="key-seat saver"></span> Saver &pound;5.99</div>
					<div><span class="key-seat regular"></span> Regular &pound;7.99</div>
					<div><span class="key-seat vip"></span> VIP &pound;9.99</div>
					<div><span class="key-seat disabled-seat"></span> Accessible &pound;5.99</div>
					<div><span class="key-seat taken"></span> Taken</div>
					<div><span class="key-seat chosen"></span> Selected</div>
				</div>
			</section>

			{#each selectedSeats as seat}
				<input type="hidden" name="selectedSeats" value={seat} />
			{/each}

			<section class="booking-summary">
				<div>
					<p class="summary-label">Movie</p>
					<h3>{selectedScreening.movieTitle}</h3>
				</div>

				<div>
					<p class="summary-label">Seats</p>
					<h3>{selectedSeats.length}</h3>
				</div>

				<div>
					<p class="summary-label">Total</p>
					<h3>&euro;{totalPrice}</h3>
				</div>

				<button class="btn btn-primary summary-button" type="submit" disabled={selectedSeats.length === 0}>
					Proceed to Payment
				</button>
			</section>
		{/if}
	</form>
</div>

<style>
	.booking-page {
		max-width: 1180px;
		margin: 0 auto;
		padding: 3rem 1rem 5rem;
	}

	.booking-header {
		text-align: center;
		margin-bottom: 2rem;
	}

	.eyebrow {
		margin: 0;
		color: #70d6ff;
		font-size: 0.8rem;
		font-weight: 800;
		text-transform: uppercase;
		letter-spacing: 0.06em;
	}

	.booking-header h1 {
		margin: 0.25rem 0;
		font-size: 2.5rem;
		font-weight: 800;
	}

	.booking-header p {
		color: #cbd5e1;
		margin: 0 auto;
		max-width: 620px;
	}

	.booking-alert {
		max-width: 760px;
		margin: 0 auto 1rem;
	}

	.booking-panel,
	.movie-preview,
	.seat-section,
	.booking-summary {
		background: #1f2937;
		color: white;
		border: 1px solid rgba(255, 255, 255, 0.14);
		border-radius: 14px;
		box-shadow: 0 0 28px rgba(0, 0, 0, 0.42);
	}

	.booking-panel {
		padding: 1.5rem;
		margin-bottom: 2rem;
	}

	.selector-grid {
		display: grid;
		grid-template-columns: 1fr 1fr;
		gap: 1.25rem;
	}

	.movie-preview {
		display: grid;
		grid-template-columns: 190px 1fr;
		gap: 1.5rem;
		padding: 1.5rem;
		margin-bottom: 2rem;
	}

	.movie-poster {
		width: 190px;
		height: 285px;
		object-fit: cover;
		border-radius: 10px;
		box-shadow: 0 0 18px rgba(0, 0, 0, 0.55);
	}

	.movie-info h2 {
		margin: 0.25rem 0 0.75rem;
		font-size: 2rem;
	}

	.movie-info p {
		color: #e5e7eb;
	}

	.movie-meta {
		display: flex;
		flex-wrap: wrap;
		gap: 0.6rem;
		margin-bottom: 1rem;
	}

	.movie-meta span {
		padding: 0.35rem 0.65rem;
		background: rgba(255, 255, 255, 0.1);
		border-radius: 999px;
		font-size: 0.9rem;
	}

	.seat-section {
		padding: 1.5rem;
		margin-bottom: 2rem;
	}

	.section-heading {
		display: flex;
		justify-content: space-between;
		gap: 1rem;
		align-items: center;
		margin-bottom: 1.25rem;
	}

	.section-heading h2,
	.section-heading p {
		margin: 0;
	}

	.section-heading p {
		color: #cbd5e1;
	}

	.screen-label {
		max-width: 520px;
		margin: 0 auto 2rem;
		padding: 0.5rem;
		text-align: center;
		text-transform: uppercase;
		font-weight: 800;
		color: #cbd5e1;
		border-top: 4px solid #70d6ff;
		border-radius: 50%;
	}

	.seat-map {
		width: fit-content;
		margin: 0 auto;
		padding: 1rem;
	}

	.seat-row {
		display: flex;
		align-items: center;
		justify-content: center;
		gap: 0.55rem;
		margin-bottom: 0.7rem;
	}

	.row-label {
		width: 1.4rem;
		color: #cbd5e1;
		font-weight: 700;
		text-align: right;
	}

	.seat {
		width: 1.55rem;
		height: 2rem;
		border-radius: 0 0 1rem 1rem;
		background-color: transparent;
		transition:
			background-color 0.15s ease,
			transform 0.15s ease,
			border-color 0.15s ease;
	}

	.seat:hover:not(.seat-taken) {
		transform: translateY(-2px);
	}

	.seat-s {
		border: 2px solid #cf0023;
	}

	.seat-r {
		border: 2px solid #31e7ff;
	}

	.seat-v {
		border: 2px solid #dda200;
	}

	.seat-d {
		border: 2px solid #1403ff;
	}

	.seat.selected {
		background-color: #50c878;
		border-color: #50c878;
	}

	.seat-taken {
		background-color: #646464;
		border: 2px solid #000000;
		cursor: not-allowed;
	}

	.seat-key {
		display: flex;
		flex-wrap: wrap;
		justify-content: center;
		gap: 0.8rem 1.2rem;
		margin-top: 1.5rem;
		color: #e5e7eb;
	}

	.seat-key div {
		display: flex;
		align-items: center;
		gap: 0.45rem;
	}

	.key-seat {
		width: 1rem;
		height: 1.25rem;
		display: inline-block;
		border-radius: 0 0 0.6rem 0.6rem;
	}

	.saver {
		border: 2px solid #cf0023;
	}

	.regular {
		border: 2px solid #31e7ff;
	}

	.vip {
		border: 2px solid #dda200;
	}

	.disabled-seat {
		border: 2px solid #1403ff;
	}

	.taken {
		background: #646464;
		border: 2px solid #000;
	}

	.chosen {
		background: #50c878;
		border: 2px solid #50c878;
	}

	.booking-summary {
		padding: 1.5rem;
		display: grid;
		grid-template-columns: 1.5fr 0.6fr 0.8fr auto;
		gap: 1rem;
		align-items: center;
	}

	.summary-label {
		margin: 0;
		color: #cbd5e1;
		font-size: 0.78rem;
		font-weight: 800;
		text-transform: uppercase;
		letter-spacing: 0.05em;
	}

	.booking-summary h3 {
		margin: 0.2rem 0 0;
		font-size: 1.25rem;
	}

	.summary-button {
		min-width: 190px;
		font-weight: 700;
	}

	@media (max-width: 768px) {
		.selector-grid,
		.movie-preview,
		.booking-summary {
			grid-template-columns: 1fr;
		}

		.movie-poster {
			width: 170px;
			height: 255px;
			margin: 0 auto;
		}

		.section-heading {
			flex-direction: column;
			align-items: flex-start;
		}

		.seat-row {
			gap: 0.35rem;
		}

		.seat {
			width: 1.25rem;
			height: 1.7rem;
		}

		.summary-button {
			width: 100%;
		}
	}
</style>
