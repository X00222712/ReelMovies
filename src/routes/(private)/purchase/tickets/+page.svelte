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


<div class="my-5">
	<h2 class="text-center">Book Ticket</h2>
	{#if form?.message}
		<p class="alert alert-danger mx-5">{form.message}</p>
	{/if}
	<form method="POST" action="?/book">
		<div class="mx-5 d-flex flex-column flex-md-row justify-content-center gap-4 py-3">
	<div class="col-md-4">
		<select
			class="form-select"
			bind:value={selectedMovieId}
			onchange={movieChanged}
			required
			style="box-shadow: 0 0 10px black;"
		>
			<option value="">Select movie</option>

			{#each movies as movie}
				<option value={movie.id}>{movie.title}</option>
			{/each}
		</select>
	</div>

	<div class="col-md-4">
		<select
			class="form-select"
			name="screeningId"
			bind:value={selectedScreeningId}
			onchange={timeChanged}
			required
			disabled={!selectedMovieId}
			style="box-shadow: 0 0 10px black;"
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

		{#if selectedScreening}
			<div class="px-md-5 mx-md-5 my-5 d-flex flex-column flex-md-row">
				<img
					src={selectedScreening.poster}
					alt="{selectedScreening.movieTitle} poster"
					class="rounded col-3 align-self-center align-self-md-left mb-5 mb-md-0"
					style="width: 200px; height: 320px; object-fit: cover; box-shadow: 0 0 15px black;"
                    />
				<div class="ms-md-5 bg-secondary rounded p-3" style="box-shadow: 0 0 15px;">
					<h2>{selectedScreening.movieTitle}</h2>
					<p>Rating: {selectedScreening.ratingScore ?? 'N/A'} / 10</p>
					<p>Age Rating: {selectedScreening.ageRating}</p>
					<p>{selectedScreening.description}</p>
				</div>
			</div>
			<h2 class="border border-3 border-dark text-center w-50 mx-auto" style="margin-top: 5rem;">
				SCREEN
			</h2>
			<div class="py-5">
				<div class="screen-seats mx-auto p-4 py-5 rounded-4" style="box-shadow: 0 0 30px; width:fit-content">
					{#each selectedScreening.screenSeats as row, i}
						<div class="d-flex flex-row justify-content-center">
							{#each row as seat, j}
								<button
									type="button"
									value="{i},{j}"
									class="mx-md-2 my-md-2 m-1 seat seat-{seat.toLowerCase()} {seatTaken(i, j)
										? 'seat-taken'
										: ''}"
									class:selected={seatSelected(i, j)}
									onclick={() => selectSeat(i, j)}
									aria-label="row {i + 1} column {j + 1}"
								></button>
							{/each}
						</div>
					{/each}
				</div>
			</div>

			{#each selectedSeats as seat}
				<input type="hidden" name="selectedSeats" value={seat} />
			{/each}

			<div class="bg-secondary py-3 px-5 my-5" style="box-shadow: 0 0 30px;">
				<h3>Payment</h3>
				<p>Selected seats: {selectedSeats.length}</p>
				<p>Total: {totalPrice}</p>
				<select name="paymentMethod" class="form-select my-3" required>
					<option value="">Choose payment method</option>
					<option value="card">Card</option>
					<option value="paypal">PayPal</option>
					<option value="cash">Pay at cinema</option>
				</select>
				<button class="btn btn-primary" type="submit">Book Tickets</button>
			</div>
		{/if}
	</form>
</div>

<style>
	.seat {
		width: 1.5rem;
		height: 2rem;
		border-radius: 0 0 4rem 4rem;
		background-color: transparent;
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
	background-color: #0B132B;
	border-color: #0B132B;
    }
    .seat-taken {
	background-color: #646464;
	border: 2px solid #000000;
	cursor: not-allowed;
    }

	@media (min-width: 785px) {
		.seat {
			scale: 120%;
		}
	}
</style>
