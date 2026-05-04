<script>
	const { data, form } = $props();
</script>

<div class="loyalty-page">
	<section class="loyalty-header">
		<p class="eyebrow">Reel Rewards</p>
		<h1>Loyalty Points</h1>
		<p>Earn points when you book tickets and redeem them for cinema rewards.</p>
	</section>

	{#if form?.message}
		<p class="alert {form.success ? 'alert-success' : 'alert-danger'}">{form.message}</p>
	{/if}

	<section class="points-card">
		<p>Your balance</p>
		<h2>{data.points} points</h2>
	</section>

	<section class="rewards-grid">
		{#each data.rewards as reward}
			<div class="reward-card" id="{reward.name}">
				<h3>{reward.name}</h3>
				<p>{reward.description}</p>
				<strong>{reward.pointsCost} points</strong>

				<form method="POST" action="?/redeem">
					<input type="hidden" name="rewardId" value={reward.id} />
					<button
						class="btn btn-primary w-100 mt-3"
						type="submit"
						disabled={data.points < reward.pointsCost}
					>
						Redeem
					</button>
				</form>
			</div>
		{/each}
	</section>

	<section class="history-card">
		<h2>Redemption History</h2>

		{#if data.redemptions.length === 0}
			<p>No rewards redeemed yet.</p>
		{:else}
			{#each data.redemptions as redemption}
				<div class="history-row">
					<span>{redemption.rewardName}</span>
					<span>{redemption.pointsSpent} points</span>
				</div>
			{/each}
		{/if}
	</section>
</div>

<style>
	.loyalty-page {
		max-width: 1100px;
		margin: 0 auto;
		padding: 3rem 1rem 5rem;
		color: white;
	}

	.loyalty-header {
		text-align: center;
		margin-bottom: 2rem;
	}

	.eyebrow {
		color: #70d6ff;
		font-weight: 800;
		text-transform: uppercase;
		letter-spacing: 0.06em;
	}

	.points-card,
	.reward-card,
	.history-card {
		background: #1f2937;
		border: 1px solid rgba(255, 255, 255, 0.14);
		border-radius: 14px;
		box-shadow: 0 0 28px rgba(0, 0, 0, 0.42);
	}

	.points-card {
		text-align: center;
		padding: 2rem;
		margin-bottom: 2rem;
	}

	.points-card h2 {
		font-size: 3rem;
		color: #70d6ff;
	}

	.rewards-grid {
		display: grid;
		grid-template-columns: repeat(3, 1fr);
		gap: 1rem;
		margin-bottom: 2rem;
	}

	.reward-card {
		padding: 1.5rem;
	}

	.reward-card p {
		color: #cbd5e1;
		min-height: 3rem;
	}

	.reward-card strong {
		color: #fd82d4;
	}

	.history-card {
		padding: 1.5rem;
	}

	.history-row {
		display: flex;
		justify-content: space-between;
		padding: 0.8rem 0;
		border-top: 1px solid rgba(255, 255, 255, 0.12);
	}

	@media (max-width: 768px) {
		.rewards-grid {
			grid-template-columns: 1fr;
		}
	}
</style>
