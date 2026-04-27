import { fail, redirect } from '@sveltejs/kit';
import { db } from '$lib/server/db';
import { loyaltyRewards, loyaltyRedemptions, rewardPoints } from '$lib/server/db/schema';
import { eq } from 'drizzle-orm';

export async function load({ locals }) {
	if (!locals.user) {
		throw redirect(303, '/auth/signin');
	}

	const userId = Number(locals.user.id);

	const [pointsRow] = await db
		.select()
		.from(rewardPoints)
		.where(eq(rewardPoints.userId, userId));

	const rewards = await db.select().from(loyaltyRewards);

	const redemptions = await db
		.select({
			id: loyaltyRedemptions.id,
			pointsSpent: loyaltyRedemptions.pointsSpent,
			createdAt: loyaltyRedemptions.createdAt,
			rewardName: loyaltyRewards.name
		})
		.from(loyaltyRedemptions)
		.innerJoin(loyaltyRewards, eq(loyaltyRedemptions.rewardId, loyaltyRewards.id))
		.where(eq(loyaltyRedemptions.userId, userId));

	return {
		points: pointsRow?.points ?? 0,
		rewards,
		redemptions
	};
}

export const actions = {
	redeem: async ({ request, locals }) => {
		if (!locals.user) {
			throw redirect(303, '/auth/signin');
		}

		const data = await request.formData();
		const rewardId = Number(data.get('rewardId'));
		const userId = Number(locals.user.id);

		const [reward] = await db
			.select()
			.from(loyaltyRewards)
			.where(eq(loyaltyRewards.id, rewardId));

		if (!reward) {
			return fail(404, { message: 'Reward not found.' });
		}

		const [pointsRow] = await db
			.select()
			.from(rewardPoints)
			.where(eq(rewardPoints.userId, userId));

		const currentPoints = pointsRow?.points ?? 0;

		if (currentPoints < reward.pointsCost) {
			return fail(400, { message: 'You do not have enough points for this reward.' });
		}

		await db
			.update(rewardPoints)
			.set({
				points: currentPoints - reward.pointsCost
			})
			.where(eq(rewardPoints.userId, userId));

		await db.insert(loyaltyRedemptions).values({
			userId,
			rewardId,
			pointsSpent: reward.pointsCost
		});

		return {
			success: true,
			message: `${reward.name} redeemed successfully.`
		};
	}
};
