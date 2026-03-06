import { usersService } from '$lib/server/services/users-service';
import { recommendedMoviesService } from '$lib/server/services/recmovies-service';
import { rewardsService } from '$lib/server/services/rewards-service';

export async function load( { cookies } ) {
    let userToken = cookies.get("userToken");
    let userData = await usersService.getUserDetails(userToken);
    if (!userData)
    { cookies.set("userToken", null, {path : "/"})}

    const recommendedMovies = await recommendedMoviesService.getRecommendedMovies();
    const rewards = await rewardsService.getRecommendedRewards();
    return {
        // Cookie
        userToken : userToken,
        // Data
        userData : userData, 
        recMovies : recommendedMovies,
        rewards : rewards

    };
}