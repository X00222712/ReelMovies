<!-- Author : Alex D -->

<script>
	const { data, form } = $props();

	let paymentMethod = $state('');
</script>

<div class="payment-page">
	<div class="payment-card">
		<div class="payment-header">
			<p class="eyebrow">Secure checkout</p>
			<h2>Complete Payment</h2>
			<p class="muted">Review your booking and choose a payment method.</p>
		</div>

		{#if form?.message}
			<p class="alert alert-danger">{form.message}</p>
		{/if}

		<div class="booking-details">
			<div>
				<p class="detail-label">Movie</p>
				<h3>{data.screening.movieTitle}</h3>
			</div>

			<div class="detail-grid">
				<div>
					<p class="detail-label">Date</p>
					<p>{data.screening.date}</p>
				</div>

				<div>
					<p class="detail-label">Time</p>
					<p>{data.screening.time}</p>
				</div>

				<div>
					<p class="detail-label">Screen</p>
					<p>{data.screening.screenName}</p>
				</div>

				<div>
					<p class="detail-label">Seats</p>
					<p>{data.selectedSeats.join(', ')}</p>
				</div>
			</div>

			<div class="total-row">
				<span>Total</span>
				<strong>&euro;{data.totalPrice}</strong>
			</div>
		</div>

		<form method="POST" action="?/pay" class="payment-form">
			<input type="hidden" name="screeningId" value={data.screening.id} />

			{#each data.selectedSeats as seat}
				<input type="hidden" name="selectedSeats" value={seat} />
			{/each}

			<label class="form-label" for="paymentMethod">Payment method</label>
			<select
				id="paymentMethod"
				name="paymentMethod"
				class="form-select"
				bind:value={paymentMethod}
				required
			>
				<option value="">Choose payment method</option>
				<option value="card">Card</option>
				<option value="cash">Pay at cinema</option>
			</select>

			{#if paymentMethod === 'card'}
				<div class="card-details">
					<label class="form-label" for="cardName">Name on card</label>
					<input id="cardName" name="cardName" class="form-control" placeholder="Alex Murphy" />

					<label class="form-label mt-3" for="cardNumber">Card number</label>
					<input
						id="cardNumber"
						name="cardNumber"
						class="form-control"
						placeholder="4242 4242 4242 4242"
						maxlength="19"
					/>

					<div class="row">
						<div class="col-md-6">
							<label class="form-label mt-3" for="expiryDate">Expiry date</label>
							<input
								id="expiryDate"
								name="expiryDate"
								class="form-control"
								placeholder="12/28"
								maxlength="5"
							/>
						</div>

						<div class="col-md-6">
							<label class="form-label mt-3" for="cvv">CVV</label>
							<input
								id="cvv"
								name="cvv"
								class="form-control"
								placeholder="123"
								maxlength="3"
							/>
						</div>
					</div>
				</div>
			{/if}

			<button class="btn btn-primary confirm-button" type="submit">
				Confirm Payment
			</button>
		</form>
	</div>
</div>

<style>
	.payment-page {
		min-height: 80vh;
		display: flex;
		justify-content: center;
		align-items: flex-start;
		padding: 3rem 1rem;
	}

	.payment-card {
		width: 100%;
		max-width: 760px;
		background: #1f2937;
		color: white;
		border: 1px solid rgba(255, 255, 255, 0.15);
		border-radius: 14px;
		box-shadow: 0 0 30px rgba(0, 0, 0, 0.5);
		padding: 2rem;
	}

	.payment-header {
		margin-bottom: 1.5rem;
	}

	.eyebrow {
		margin: 0;
		color: #70d6ff;
		font-weight: 700;
		text-transform: uppercase;
		font-size: 0.8rem;
		letter-spacing: 0.06em;
	}

	.payment-header h2 {
		margin: 0.2rem 0;
		font-size: 2rem;
	}

	.muted,
	.detail-label {
		color: #cbd5e1;
	}

	.booking-details {
		background: rgba(255, 255, 255, 0.06);
		border-radius: 10px;
		padding: 1.25rem;
		margin-bottom: 1.5rem;
	}

	.detail-grid {
		display: grid;
		grid-template-columns: repeat(2, 1fr);
		gap: 1rem;
		margin-top: 1rem;
	}

	.detail-label {
		margin: 0;
		font-size: 0.8rem;
		text-transform: uppercase;
		letter-spacing: 0.04em;
	}

	.detail-grid p {
		margin-bottom: 0;
	}

	.total-row {
		margin-top: 1.25rem;
		padding-top: 1rem;
		border-top: 1px solid rgba(255, 255, 255, 0.15);
		display: flex;
		justify-content: space-between;
		align-items: center;
		font-size: 1.25rem;
	}

	.total-row strong {
		font-size: 1.7rem;
		color: #70d6ff;
	}

	.payment-form {
		display: grid;
		gap: 1rem;
	}

	.card-details {
		padding: 1rem;
		background: rgba(0, 0, 0, 0.18);
		border-radius: 10px;
		border: 1px solid rgba(255, 255, 255, 0.12);
	}

	.confirm-button {
		margin-top: 0.5rem;
		padding: 0.8rem;
		font-weight: 700;
	}

	@media (max-width: 768px) {
		.payment-card {
			padding: 1.25rem;
		}

		.detail-grid {
			grid-template-columns: 1fr;
		}

		.total-row {
			align-items: flex-start;
			flex-direction: column;
			gap: 0.25rem;
		}
	}
</style>
