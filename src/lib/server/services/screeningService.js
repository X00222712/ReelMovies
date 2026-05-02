import { moviesDataAccess } from "../data-access/movie-data-access"
import { screenDataAccess } from "../data-access/screenDataAccess"
import { moviesService } from "./movie-service"


export const screenService = {
    async getScreeningInfo(screenId)
    {
        const screening = await screenDataAccess.getScreeningInfo(screenId)
        const movie = await moviesService.getMovieById(screening.movieId)

        return { screening, movie }
    },

    async getAllScreening()
    {
        return await screenDataAccess.getAllScreening()
    }
}