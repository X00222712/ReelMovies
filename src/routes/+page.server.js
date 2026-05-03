// Author : Glen J

import { usersService } from '$lib/server/services/users-service';
import { recommendedMoviesService } from '$lib/server/services/recmovies-service';
import { rewardsService } from '$lib/server/services/rewards-service';
import { user } from '$lib/server/db/auth.schema';

export async function load( { cookies, locals, ur } ) {
    // let userData = await usersService.getUserDetails(userToken);

    let username = "Guest"
    let RMPoints = 0
    let logged = false
    try {
        if (locals.user)
        {
            username = locals.user.name
            const id = locals.user.id
            RMPoints = (await usersService.getUserPoints(Number(id))).points
            logged = true
        }
    } catch (error)
    {
        console.log(error)
        let username = "Guest"
        let RMPoints = 0
    }

    const rewards = await rewardsService.getRecommendedRewards();
    return {
        // Data
        userData : { username, RMPoints, logged},
        rewards : rewards

    };
}