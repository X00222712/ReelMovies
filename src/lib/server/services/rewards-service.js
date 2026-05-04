import { rewardsDataAccess } from "../data-access/rewards-data-access"
import { NotFoundError } from '../utils/errors.js'
// Validation

export const rewardsService = {
    async getRewardByName( name )
    {
        rewardsDataAccess.getRewardByName( name )
    },

    async getRecommendedRewards() {
        const rewards = await rewardsDataAccess.getRecommendedRewards();
        if (!rewards) throw new NotFoundError('Could not find recommended rewards');
        return rewards;
    }
}