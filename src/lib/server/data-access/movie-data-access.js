  // Mock data (replace later with DB)
const movies = [
    {
        id: 1,
        title: "Interstellar",
        // https://www.imdb.com/title/tt0816692/
        description:  "When Earth becomes uninhabitable in the future, a farmer and ex-NASA pilot, Joseph Cooper, is tasked to pilot a spacecraft, along with a team of researchers, to find a new planet for humans.",
        runtime: "2h 49m",
        rating: 8.7,
        genre: "Sci-Fi",
        ageRating: "PG-13",
        poster: "https://image.tmdb.org/t/p/w500/rAiYTfKGqDCRIIqo664sY9XZIvQ.jpg"
    },
    {
        id: 2,
        title: "The Batman",
        // https://www.imdb.com/title/tt1877830/
        description: "When a sadistic serial killer begins murdering key political figures in Gotham, the Batman is forced to investigate the city's hidden corruption and question his family's involvement.",
        runtime: "2h 56m",
        rating: 7.8,
        genre: "Action",
        ageRating: "PG-13",
        poster: "https://image.tmdb.org/t/p/w500/74xTEgt7R36Fpooo50r9T25onhq.jpg"
    },
    {
    id: 3,
        title: "Coco",
        // https://www.imdb.com/title/tt2380307/
        description: "Aspiring musician Miguel, confronted with his family's ancestral ban on music, enters the Land of the Dead to find his great-great-grandfather, a legendary singer.",
        runtime: "1h 45m",
        rating: 8.4,
        genre: "Animation",
        ageRating: "G",
        poster: "https://image.tmdb.org/t/p/w500/gGEsBPAijhVUFoiNpgZXqRVWJt2.jpg"
    }
];

export const moviesDataAccess = {
    async getAllMovies() {
        return movies;
    }
}