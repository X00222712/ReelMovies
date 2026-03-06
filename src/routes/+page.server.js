import { usersService } from '$lib/server/services/users-service';
import { recommendedMoviesService } from '$lib/server/services/recmovies-service';
import { rewardsService } from '$lib/server/services/rewards-service';
import { undefined } from 'zod/v3';

export async function load( { cookies } ) {
    checkoutCookies( cookies );
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


function checkoutCookies(cookies)
{
    console.log(String.undefined === cookies.get("userToken"))
    if (String.undefined === cookies.get("userToken"))
    { cookies.set("userToken", null, { path: "/"}); }
}