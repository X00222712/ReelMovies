import { usersService } from '$lib/server/services/users-service';
import { recommendedMoviesService } from '$lib/server/services/recmovies-service';
import { rewardsService } from '$lib/server/services/rewards-service';

export async function load( { cookies, locals, ur } ) {
    // let userData = await usersService.getUserDetails(userToken);


    const recommendedMovies = await recommendedMoviesService.getRecommendedMovies();
    const rewards = await rewardsService.getRecommendedRewards();
    return {
        // Data
        userData : { username : "Guest", RMPoints : 0, signout : true},
        recMovies : recommendedMovies,
        rewards : rewards

    };
}