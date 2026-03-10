import { moviesDataAccess } from "../data-access/movie-data-access"




export const moviesService = {
    async getAllMovies() {
        return await moviesDataAccess.getAllMovies();
    }
}