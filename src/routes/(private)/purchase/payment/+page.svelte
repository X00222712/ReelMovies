<script>
	const { data, form } = $props();
</script>

<div class="container my-5">
	<h2 class="text-center mb-4">Payment</h2>

	{#if form?.message}
		<p class="alert alert-danger">{form.message}</p>
	{/if}

	<div class="bg-secondary rounded p-4 mx-auto" style="max-width: 650px; box-shadow: 0 0 20px black;">
		<h3>{data.screening.movieTitle}</h3>
		<p>{data.screening.date} at {data.screening.time}</p>
		<p>{data.screening.screenName}</p>

		<hr />

		<p>Selected seats: {data.selectedSeats.join(', ')}</p>
		<p class="fs-4 fw-bold">Total: £{data.totalPrice}</p>

		<form method="POST" action="?/pay">
			<input type="hidden" name="screeningId" value={data.screening.id} />

			{#each data.selectedSeats as seat}
				<input type="hidden" name="selectedSeats" value={seat} />
			{/each}

			<label class="form-label" for="paymentMethod">Payment method</label>
			<select id="paymentMethod" name="paymentMethod" class="form-select my-3" required>
				<option value="">Choose payment method</option>
				<option value="card">Card</option>
				<option value="paypal">PayPal</option>
				<option value="cash">Pay at cinema</option>
			</select>
            <div class="card-details mt-3">
	            <label class="form-label" for="cardName">Name on card</label>
	            <input
		            id="cardName"
		            name="cardName"
		            class="form-control"
		            placeholder="Alex Murphy"
	            />

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

			<button class="btn btn-primary w-100" type="submit">Confirm Payment</button>
		</form>
	</div>
</div>
