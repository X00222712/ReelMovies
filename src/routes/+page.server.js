import { recommendedMoviesService } from '$lib/server/services/recmovies-service';

export async function load() {
    const userdata = { username : "Guest", signinToken : "a", RMP : 350}
    const recommendedMovies = await recommendedMoviesService.getRecommendedMovies();
    const rewards = [
        { id : 4, name : "Coca cola", price : 500, image : 'drinks/coca_cola.png' },
        { id : 5, name : "Fanta", price : 300, image : 'drinks/fanta.png' },
        { id : 63, name : "Small popcorn", price : 200, image : 'foods/sm-popcorn.png' },
    ]
    return {userData : userdata, recMovies : recommendedMovies, rewards : rewards };
}